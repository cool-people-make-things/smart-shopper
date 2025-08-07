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
    ticketed_prices = extract_price_and_promo(node)

    {
      id: extract_id(node),
      title: extract_name(node),
      amt: extract_amt(node),
      image: extract_image(node),
      productPageUrl: extract_product_page_url(node),
      price: ticketed_prices[:price],
      promo: ticketed_prices[:promo],
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
    node["data-testid"][/product-(\d+)-EA-000/, 1]
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
    dirty_link.split("#").first
  end

  # extract_price_and_promo - Retrieves the price and promo details
  #
  # @param node [Nokogiri::XML::Element] The product node
  # @return [Hash] The price and promo details
  #   - :price [Hash] :value, :per, :unitPrice, :unit
  #   - :promo [Hash] :value, :per, :unitPrice, :unit, :tag, :limit?
  def self.extract_price_and_promo(node)
    dollar_nodes = node.css("[data-testid='price-dollars']", node)
    cent_nodes = node.css("[data-testid='price-cents']", node)
    per_nodes = node.css("[data-testid='price-per']", node)

    promo = {}
    # If there is a promo, it will appear before the main price
    # otherwise, we will leave promo as an empty hash

    # --- Promo Price ---
    if has_promo?(node)
      promo_badge_name = node.at_css("img", node)&.[]("alt")
      promo[:tag] = promo_badge_name.gsub("Badge, ", "")

      promo[:value] = get_value(dollar_nodes.first, cent_nodes.first)
      promo[:per] = per_nodes.first.text.strip

      promo_unit_nodes = node.css("[data-testid='complex-promo-unit-price']", node)
      promo_unit_price, promo_unit = promo_unit_nodes.text.strip.split("/")
      promo[:unitPrice] = promo_unit_price.gsub("$", "")
      promo[:unit] = promo_unit

      limit_node = node.at_css("[data-testid='promo-product-limit']", node)
      if limit_node
        promo[:limit] = limit_node.text.strip
      end
    end
    # ---

    unit_nodes = node.css("[data-testid='non-promo-unit-price']", node)
    unit_price, unit = unit_nodes.text.strip.split("/")

    price = {
      value: get_value(dollar_nodes.last, cent_nodes.last),
      per: per_nodes.last.text.strip,
      unitPrice: unit_price.gsub("$", ""),
      unit: unit,
    }

    {
      price: price,
      promo: has_promo?(node) ? promo : nil,
    }
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
end
