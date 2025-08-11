class PaknsaveParser

  # get_products - Parses HTML to extract product details
  #
  # @param html [String] The HTML from a product page
  # @return [Array<Product>] A list of products
  def self.get_products(html)
    doc = Nokogiri::HTML(html)
    Log.info("Parsing HTML Document: #{doc.title}")

    filter_menu = doc.at_css("[data-testid='selected-refinements']")
    product_grid = filter_menu&.next_element

    unless product_grid
      Log.error("Product grid not found in the HTML document.")
    end

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
    {
      id: extract_id(node),
      title: extract_name(node),
      amt: extract_amt(node),
      image: extract_img(node),
      productPageUrl: extract_product_page_url(node),
      price: extract_price(node),
      promo: extract_promo(node),
    }
  rescue => e
    Log.warn("Skipping product due to parsing error: #{e.message}")
    nil
  end

  # extract_name - Retrieves the product name
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String] The product name
  def self.extract_name(node)
    node.at_css("[data-testid='product-title']")&.text&.strip
  end

  # extract_id - Retrieves the product ID
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String] The product ID
  def self.extract_id(node)
    node["data-testid"][/product-(\d+)-(?:EA|KGM)-000/, 1]
  end

  # extract_amt - Retrieves the amount (weight, volume) of the product
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String] The total product amount
  def self.extract_amt(node)
    node.at_css("[data-testid='product-subtitle']")&.text&.strip
  end

  # extract_img - Retrieves the product image URL
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String] The product image URL
  def self.extract_img(node)
    node.at_css("[data-testid='product-image']")&.[]("src")
  end

  # extract_product_page_url - Retrieves the page URL for the individual product
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [String] The product page URL
  def self.extract_product_page_url(node)
    dirty_link = node.at_css("a")&.[]("href")
    dirty_link.split("#").first
  end

  # extract_price - Retrieves the price details
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Hash] The price details
  #   - :price [Hash] :value, :per, :unitPrice, :unit
  def self.extract_price(node)
    dollar_nodes = node.css("[data-testid='price-dollars']")
    cent_nodes = node.css("[data-testid='price-cents']")
    per_nodes = node.css("[data-testid='price-per']")

    unit_nodes = node.css("[data-testid='non-promo-unit-price']")
    unit_price, unit = unit_nodes.text.strip.split("/")

    {
      value: get_value(dollar_nodes.last, cent_nodes.last),
      per: per_nodes.last.text.strip,
      unitPrice: unit_price.gsub("$", ""),
      unit: unit,
    }
  end

  # Extracts promo details, choosing the appropriate method.
  #
  # @param node [Nokogiri::XML::Element] The product node.
  # @return [Hash] Promotion data.
  def self.extract_promo(node)
    return extract_complex_promo(node) if has_complex_promo?(node)
    return extract_promo_tag(node) if has_promo?(node)
    nil
  end

  # extract_complex_promo - Retrieves the promo details
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Hash] The promo details
  #   - :promo [Hash] :tag, :value, :unitPrice, :unit, :multibuyThreshold?, :limit?
  def self.extract_complex_promo(node)
    promo = { tag: "Extra Low" }
    promo_node = node.css("[data-testid='decal']")

    dollar_nodes = promo_node.css("[data-testid='price-dollars']")
    cent_nodes = promo_node.css("[data-testid='price-cents']")

    promo[:value] = get_value(dollar_nodes.first, cent_nodes.first)

    promo_unit_nodes = promo_node.css("[data-testid='complex-promo-unit-price']")
    promo_unit_price, promo_unit = promo_unit_nodes.text.strip.split("/")
    promo[:unitPrice] = promo_unit_price.gsub("$", "")
    promo[:unit] = promo_unit

    multibuy_threshold_node = promo_node.at_css("[data-testid='multibuy-threshold']")

    if multibuy_threshold_node
      promo[:multibuyThreshold] = multibuy_threshold_node.text.split(" ").first
    end

    limit_node = promo_node.at_css("[data-testid='promo-product-limit']")
    if limit_node
      promo[:limit] = limit_node.text.strip.split(" ").last
    end

    promo
  end

  # extract_promo_tag - Retrieves the tag details
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Hash] :tag
  def self.extract_promo_tag(node)
    promo_node = node.at_xpath(".//*[contains(@data-testid, 'product-decal-')]")
    promo_badge_name = promo_node.at_css("svg")&.[]("aria-label")

    tag = case promo_badge_name
      when "6000 badge" then "Extra Low"
      when "7000 badge" then "Everyday Low"
      else nil
      end

    { tag: tag }
  end

  # has_complex_promo? - Checks if the product has a complex promo
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Boolean] TRUE if a complex promo decal is present
  def self.has_complex_promo?(node)
    node.at_css("[data-testid='decal']").present?
  end

  # has_promo? - checks if the product has a promo
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Boolean] TRUE if a promo deal is present
  def self.has_promo?(node)
    node.at_xpath(".//*[contains(@data-testid, 'product-decal-')]").present?
  end

  # get_value - returns the price as a standardized string, "dollars.cents"
  #
  # @param dollar_node [Nokogiri::XML::Element] Node containing the dollars
  # @param cent_node [Nokogiri::XML::Element] Node containing the cents
  # @return [String] The formatted price
  def self.get_value(dollar_node, cent_node)
    pretty_dollars = dollar_node.text.strip.gsub(".", "")
    pretty_cents = cent_node.text.strip
    "#{pretty_dollars}.#{pretty_cents}"
  end
end
