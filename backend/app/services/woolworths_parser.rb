# encoding: UTF-8
class WoolworthsParser

  # get_products - Parses the HTML content of a Woolworths product page to extract product details
  #
  # @param html [String] The HTML content of the product page
  # @return [Array<Product>] A list of product objects extracted from the HTML
  def self.get_products(html)
    doc = Nokogiri::HTML(html)
    Log.info("Parsing HTML Document: #{doc.title}")

    product_grid = doc.at_css("product-grid")

    Log.error("Product grid not found in the HTML document.") unless product_grid

    product_grid_items = product_grid.children
    valid_items = product_grid_items.select { |node| node.element? && node.name == "cdx-card" }

    Log.debug("Found #{valid_items&.size || "0"} valid items")

    results = []
    valid_items.each_with_index do |node, idx|
      product = parse_one_product(node, idx)
      results << product if product
    end

    results
  end

  private

  # parse_one_product - Parses a single product node to extract its details
  #
  # @param node [Nokogiri::XML::Element] The product node to parse
  # @param idx [Integer] The index of the product in the list (used for debugging or logging)
  # @return [Hash, nil] A hash containing product details or nil if parsing fails
  def self.parse_one_product(node, idx)
    title = extract_name(node)
    ticketed_prices = extract_price_and_promo(node)

    {
      supermarket: "wls",
      id: extract_id(node),
      title: title,
      image: extract_image(node),
      productPageUrl: extract_product_page_url(node),
      price: ticketed_prices[:price],
      promo: ticketed_prices[:promo],
    }
  rescue => e
    Log.warn("Skipping product due to parse error: #{e.message}")
    nil
  end

  # extract_id - Extracts the product ID from the node
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String] The product ID extracted from the element's ID attribute
  def self.extract_id(node)
    node.at_css("h3")["id"][/product-(\d+)/, 1]
  end

  # extract_name - Extracts the product name from the node
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String, nil] The product name with normalized whitespace, or nil if not found
  def self.extract_name(node)
    node.css("h3[id$='-title']")
      .find { |h3| h3["id"] =~ /^product-\d+-title$/ }
      &.text
      &.gsub(/\s+/, " ") # <- Replaces whitespace chunks with a single space
      &.strip
  end

  # extract_image - Extracts the product image URL from the node
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String, nil] The image URL, or nil if no image is found
  def self.extract_image(node)
    node.at_css("img")&.[]("src")
  end

  # extract_product_page_url - Extracts the product page URL from the node
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String, nil] The product page URL, or nil if not found
  def self.extract_product_page_url(node)
    title_link = node.at_css("a:has(h3[id*='product-'][id$='-title'])")
    href = title_link&.[]("href")
    return nil unless href

    "https://www.woolworths.co.nz#{href}"
  end

  # extract_price_and_promo - Extracts current price and promo details from a product node
  #
  # @param node [Nokogiri::XML::Element] The product node to extract pricing from
  # @return [Hash] Price information including value, per, unit price, and promo details
  def self.extract_price_and_promo(node)
    current_price = get_current_price(node)

    return get_member_prices(node, current_price) if has_member_price?(node)
    return get_multibuy_prices(node, current_price) if has_multi_buy?(node)
    return get_special_prices(node, current_price) if has_prev_price?(node)

    # No previous price found
    tag = get_tag(node)
    {
      price: current_price,
      promo: tag ? { tag: tag } : nil,
    }
  end

  # get_current_price - Extracts the current price details from a product node
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Hash] Price details with :value, :per, :unitPrice, and :unit keys
  def self.get_current_price(node)
    price_node = node.at_css("h3[id$='-price']")
    Log.error("Price missing") unless price_node

    # --- Current price (promo or regular) ---
    promo_dollars_node = price_node.at_css("em")
    promo_cents_node = price_node.at_css("span")
    current_value = get_value(promo_dollars_node, promo_cents_node)
    current_per = get_unit(promo_cents_node)

    # ---  Unit price and unit ---
    cup_price_node = node.at_css("span.cupPrice")
    price_text = cup_price_node&.text&.strip || ""
    unit_price, unit = price_text.include?("/") ? price_text.split("/").map(&:strip) : [nil, nil]
    unit_price = unit_price&.gsub("$", "")

    current_price = {
      value: current_value,
      per: current_per,
      unitPrice: unit_price,
      unit: unit,
    }
    current_price
  end

  # get_member_prices - Builds price and promo hashes for member-priced products
  #
  # If member, multibuy, or special pricing is detected, it delegates
  # to the relevant extractor
  #
  # @param node [Nokogiri::XML::Element] The product node containing pricing HTML
  # @return [Hash] A hash with :price and optional :promo keys
  #   - :price [Hash] :value :per :unitPrice :unit
  #   - :promo [Hash]  :tag :plus any overridden price/unit/unitPrice data from the promo
  def self.get_member_prices(node, current_price)
    price = {}

    member_node = node.at_css(".productStrap.isMemberPrice")
    Log.error("No member price found") unless member_node

    was = get_was_price(node)

    non_member_unit_node = node.css(".noMemberCupPrice")
    orig_unit_combo = non_member_unit_node&.text&.strip.split(" / ")
    orig_unit_price = orig_unit_combo.first&.gsub("$", "")
    orig_unit = orig_unit_combo.last

    price[:value] = was[:value]
    price[:per] = was[:per]
    price[:unitPrice] = orig_unit_price
    price[:unit] = orig_unit

    promo = current_price.dup
    promo[:tag] = get_tag(node)

    return { price: price, promo: promo }
  end

  # get_multibuy_prices - Adds multibuy promo details to the current price
  #
  # Extracts multibuy unit price and tag from the node
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @param current_price [Hash] The base price data
  # @return [Hash] Hash with :price and multibuy :promo details
  def self.get_multibuy_prices(node, current_price)
    non_member_unit_node = node.css(".multiCupPrice")
    promo_unit_combo = non_member_unit_node&.text&.strip.gsub(/\s+/, "").split("/")
    promo_unit_price = promo_unit_combo.first&.gsub("$", "")
    promo_unit = promo_unit_combo.last

    promo = {
      tag: get_tag(node),
      value: get_tag_text(node).split(" ").last.strip.gsub("$", ""),
      unitPrice: promo_unit_price,
      unit: promo_unit,
      multibuyThreshold: get_tag_text(node).split(" ").first,
    }
    return { price: current_price, promo: promo }
  end

  # get_special_prices - Builds pricing details for specials with a previous (was) price
  #
  # Uses the previous price as the main price and sets the current
  # price as a promo, without unit pricing
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @param current_price [Hash] The current price details
  # @return [Hash] Hash with :price (was price) and :promo (current promo)
  def self.get_special_prices(node, current_price)
    price = {}
    promo = {}

    was = get_was_price(node)

    price[:value] = was[:value]
    price[:per] = was[:per]
    price[:unitPrice] = current_price[:unitPrice]
    price[:unit] = current_price[:unit]

    promo[:tag] = get_tag(node)

    promo[:value] = current_price[:value]
    promo[:per] = current_price[:per]
    promo[:unitPrice] = nil
    promo[:unit] = nil

    return { price: price, promo: promo }
  end

  # get_was_price - Extracts the previous (was) price from the product node
  #
  # Looks for the previous price using preferred CSS selectors and extracts the dollar and cent values.
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Hash] Hash with :value (e.g., "4.99") and :per (unit descriptor)
  def self.get_was_price(node)
    potential_nodes = node.css(".previousPrice .price--was")
    was_node = potential_nodes.find { |el| el.text.strip.match(/\$\d+\.\d{2}/) }
    Log.error("Prev price missing") unless was_node

    price_strings = was_node.text.strip.match(/\$(\d+)\.(\d+)/)
    was_dollars = price_strings[1]
    was_cents = price_strings[2]

    {
      value: "#{was_dollars}.#{was_cents}",
      per: get_unit(was_node),
    }
  end

  # get_value - Combines dollar and cent nodes into a price string
  #
  # @param dollar_node? [Nokogiri::XML::Element] The node containing dollar value, or nil
  # @param cent_node? [Nokogiri::XML::Element] The node containing cent value, or nil
  # @return [String] Price formatted as "X.XX"
  def self.get_value(dollar_node, cent_node)
    pretty_dollars = dollar_node&.text&.strip&.gsub(".", "") || "0"
    pretty_cents = cent_node&.text&.strip || "00"
    "#{pretty_dollars}.#{pretty_cents}"
  end

  # get_unit - Extracts the unit from the cent node text (e.g., "kg", "L")
  #
  # Defaults to "ea" (each) if no unit pattern is found.
  #
  # @param cent_node? [Nokogiri::XML::Element] The node containing unit info, or nil
  # @return [String] The extracted unit or "ea"
  def self.get_unit(cent_node)
    return "ea" unless cent_node

    # Get full text content of the span, collapse whitespace
    full_text = cent_node.text.strip.gsub(/\s+/, " ")
    # Match a pattern like "60 kg" or "90 kg" or fallback
    match = full_text.match(/\d+\s*([a-zA-Z]+)$/)

    match ? match[1] : "ea"
  end

  # get_tag - Extracts a promotional tag from the product node
  #
  # Checks for member price tag, Disney promo SVG label, or general strap title
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String, nil] The tag text if found, otherwise nil
  def self.get_tag(node)
    return nil unless node.is_a?(Nokogiri::XML::Element)

    # 1. Member Price tag
    member_node = node.at_css(".productStrap.isMemberPrice .productStrap-title")
    if member_node
      member_text = member_node&.text&.strip
      return member_text unless member_text.nil? || member_text.empty?
    end

    # 2. Disney Disc
    promo_svg = node.at_css("svg[aria-label]")
    if promo_svg
      svg_label = promo_svg["aria-label"]&.strip
      # Only accept Disney discs text, exclude generic ones containing "promotion"
      if svg_label&.include?("Disney Discs") && !svg_label.include?("promotion")
        return svg_label
      end
    end

    # 3. Specials
    strap_node = node.at_css(".productStrap-title")
    if strap_node
      strap_text = strap_node&.text&.strip
      return strap_text unless strap_text.empty?
    end

    nil
  end
  # has_member_price? - Checks if the product has a member-only price
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Boolean] TRUE if a member price is present
  def self.has_member_price?(node)
    node.at_css(".isMemberPrice").present?
  end

  # has_multi_buy? - Checks if the product has a multibuy offer (e.g., "2 for $5")
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Boolean] TRUE if multibuy text is detected
  def self.has_multi_buy?(node)
    multi_check = /\A\d+\s+for\s+\$\d+/i
    banner_text = get_tag_text(node)
    multi_check.match?(banner_text)
  end

  # has_prev_price? - Checks if the product displays a previous price
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Boolean] TRUE if a previous price is found
  def self.has_prev_price?(node)
    node.at_css(".previousPrice .price--was").present?
  end

  # has_banner_tag? - Checks if the product has a promotional banner tag
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Boolean] TRUE if a product strap/banner is present
  def self.has_banner_tag?(node)
    node.at_css(".productStrap").present?
  end

  # get_tag_text - Retrieves the lowercase text from the product's banner tag
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String, nil] The banner text, or nil if not found
  def self.get_tag_text(node)
    node.at_css(".productStrap-text")&.text&.strip&.downcase
  end
end
