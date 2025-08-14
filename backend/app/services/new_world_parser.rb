class NewWorldParser

  # get_products - Parses HTML to extract product details
  #
  # @param html [String] The HTML from a product page
  # @return [Array<Product>] A list of products
  def self.get_products(html)
    doc = Nokogiri::HTML(html)
    Log.info("Parsing HTML Document: #{doc.title}")

    filter_menu = doc.at_css("[data-testid='selected-refinements']")
    product_grid = filter_menu&.next_element

    Log.error("Product grid not found in the HTML document.") unless product_grid

    product_grid_items = product_grid.children.children
    Log.debug("Found #{product_grid_items.size} products")

    results = []
    product_grid_items.each do |node|
      product = parse_one_product(node)
      results << product if product
    end
    results
  end

  private

  # parse_one_product - Extracts details for a single product
  #
  # @param node [Nokogiri::XML::Element] The parent tag containing product details
  # @return [Product || nil] The product details or nil if parsing fails
  def self.parse_one_product(node)
    product_title = "#{extract_name(node)} #{extract_amt(node)}"

    {
      supermarket: "nw",
      id: extract_id(node),
      title: product_title,
      image: extract_image(node),
      productPageUrl: extract_product_page_url(node),
      price: extract_price(node),
      promo: extract_promo(node),
    }
  rescue => e
    Log.warn("Skipping product due to parse error: #{e.message}")
    nil
  end

  # extract_id - Retrieves the product ID
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String] The product ID
  def self.extract_id(node)
    node["data-testid"][/product-(\d+)-(?:EA|KGM)-000/, 1]
  end

  # extract_name - Retrieves the product name
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String] The product name
  def self.extract_name(node)
    node.at_css("[data-testid='product-title']", node)&.text&.strip
  end

  # extract_amt - Retrieves the amount (weight, volume) of the product
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String] The total product amount
  def self.extract_amt(node)
    node.at_css("[data-testid='product-subtitle']", node)&.text&.strip
  end

  # extract_image - Retrieves the product image URL
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String] The product image URL
  def self.extract_image(node)
    node.at_css("[data-testid='product-image']", node)&.[]("src")
  end

  # extract_product_page_url - Retrieves the page URL for the individual product
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String] The product page URL
  def self.extract_product_page_url(node)
    dirty_link = node.at_css("a", node)&.[]("href")
    link = dirty_link.split("#").first
    "https://www.newworld.co.nz#{link}"
  end

  def self.extract_price(node)
    dollar_nodes = node.css("[data-testid='price-dollars']", node)
    cent_nodes = node.css("[data-testid='price-cents']", node)
    per_nodes = node.css("[data-testid='price-per']", node)

    unit_nodes = node.css("[data-testid='non-promo-unit-price']", node)
    unit_price, unit = unit_nodes.text.strip.split("/")

    {
      value: get_value(dollar_nodes.last, cent_nodes.last),
      per: per_nodes.last.text.strip,
      unitPrice: unit_price&.gsub("$", ""),
      unit: unit ? unit : nil,
    }
  end

  def self.extract_promo(node)
    return extract_complex_promo(node) if has_promo?(node)
    return extract_promo_tag(node) if has_simple_promo?(node)
    nil
  end

  # extract_complex_promo - Retrieves the promo details
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Hash] The promo details
  #   - :promo [Hash] :tag, :value, :per, :unitPrice, :unit, :multibuyThreshold?, :limit?
  def self.extract_complex_promo(node)
    promo = {}

    dollar_nodes = node.css("[data-testid='price-dollars']")
    cent_nodes = node.css("[data-testid='price-cents']")
    per_nodes = node.css("[data-testid='price-per']")

    promo[:tag] = extract_promo_tag(node)[:tag]

    promo[:value] = get_value(dollar_nodes.first, cent_nodes.first)
    promo[:per] = per_nodes.first.text.strip

    promo_unit_nodes = node.css("[data-testid='complex-promo-unit-price']")
    promo_unit_price, promo_unit = promo_unit_nodes.text.strip.split("/")
    promo[:unitPrice] = promo_unit_price&.gsub("$", "")
    promo[:unit] = promo_unit ? promo_unit : nil

    limit_node = node.at_css("[data-testid='promo-product-limit']")
    if limit_node
      promo[:limit] = limit_node.text.strip
    end

    multibuy_threshold_node = node.at_css("[data-testid='multibuy-threshold']")
    if multibuy_threshold_node
      promo[:multibuyThreshold] = multibuy_threshold_node.text.strip.split(" ").first
    end
    promo
  end

  def self.extract_promo_tag(node)
    promo_node = node.at_xpath(".//*[contains(@data-testid, 'product-decal-')]")
    promo_badge_name = promo_node.at_css("svg")&.[]("aria-label")
    { tag: promo_badge_name.gsub("Badge, ", "") } if promo_badge_name
  end

  # get_value - returns the price as a standardized string, "dollars.cents"
  #
  # @param dollar_node [Nokogiri::XML::Element] Node containing the dollars
  # @param cent_node [Nokogiri::XML::Element] Node containing the cents
  # @return [String] The formatted price
  #
  # @example
  #   get_value(<p> 3 </p>, <p> 12 </p>) => "3.12"
  #   get_value(<p> 3. </p>, <p> 12 </p>) => "3.12"
  def self.get_value(dollar_node, cent_node)
    pretty_dollars = dollar_node.text.strip.gsub(".", "")
    pretty_cents = cent_node.text.strip
    "#{pretty_dollars}.#{pretty_cents}"
  end

  # has_promo? - Checks if the product has a promo
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Boolean] TRUE if a promo decal is present
  def self.has_promo?(node)
    node.at_css("[data-testid='decal']", node).present?
  end

  def self.has_simple_promo?(node)
    node.at_xpath(".//*[contains(@data-testid, 'product-decal-')]").present?
  end
end
