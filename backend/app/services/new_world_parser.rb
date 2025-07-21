class NewWorldParser
  def self.get_products(html)
    doc = Nokogiri::HTML(html)

    results = []
    puts "-----> Parsing HTML Document: #{doc.title}"

    filter_menu = doc.at_css("[data-testid='selected-refinements']")
    product_grid = filter_menu.next_element
    product_grid_items = product_grid.children.children
    puts "-----> Found #{product_grid_items.size} products"

    product_grid_items.each do |node|
      ticketed_prices = extract_price_and_promo(node)

      product = {
        id: extract_id(node),
        title: extract_name(node),
        amt: extract_amt(node),
        image: extract_image(node),
        productPageUrl: extract_product_page_url(node),
        price: ticketed_prices[:price],
        promo: ticketed_prices[:promo],
      }

      results << product
    end

    results
  end

  private

  def self.extract_id(node)
    node["data-testid"][/product-(\d+)-EA-000/, 1]
  end

  def self.extract_name(node)
    node.at_css("[data-testid='product-title']", node)&.text&.strip
  end

  def self.extract_amt(node)
    node.at_css("[data-testid='product-subtitle']", node)&.text&.strip
  end

  def self.extract_image(node)
    node.at_css("[data-testid='product-image']", node)&.[]("src") || ""
  end

  def self.extract_product_page_url(node)
    dirty_link = node.at_css("a", node)&.[]("href")
    dirty_link.split("#").first || ""
  end

  def self.extract_price_and_promo(node)
    dollar_nodes = node.css("[data-testid='price-dollars']", node)
    cent_nodes = node.css("[data-testid='price-cents']", node)
    per_nodes = node.css("[data-testid='price-per']", node)

    # If there is a promo, it will appear before the main price
    # otherwise, we will leave promo as an empty hash
    promo = {}

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
      promo: promo,
    }
  end

  def self.get_value(dollar_node, cent_node)
    pretty_dollars = dollar_node.text.strip.gsub(".", "")
    pretty_cents = cent_node.text.strip
    "#{pretty_dollars}.#{pretty_cents}"
  end

  def self.has_promo?(node)
    node.at_css("[data-testid='decal']", node).present?
  end
end
