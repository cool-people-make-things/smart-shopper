class SearchController < ApplicationController
  VALID_SHOPS = %w[nw pns wls test_shop]
  before_action :validate_search

  # Handles the search request for products in a specified supermarket.
  #
  # @param q [String] The search query.
  # @param supermarket [String] The supermarket identifier.
  # @return [JSON] The search results in JSON format.
  #   - query: The search query.
  #   - supermarket: The supermarket identifier.
  #   - source: The URL of the search results.
  #   - results: An array of products found in the search.
  def index
    query = params[:q]
    supermarket = params[:supermarket]

    puts "---> Searching for '#{query}' in #{supermarket} supermarket"

    # TO BE REMOVED: once all scrapers working, we should check against VALID_SHOPS instead
    temp_supermarkets = %w[nw pns]

    if temp_supermarkets.include?(supermarket)
      begin
        url = WebScraper.get_url(supermarket, query)
        html = WebScraper.fetch_html(url)
        raise "No HTML returned" if html.blank?

        DataManager.write_html_file(supermarket, html)

        # Use the appropriate parser service based on the supermarket
        parser = case supermarket
          when "nw"
            NewWorldParser
          end

        products = parser.get_products(html)
        raise "No products found" if products.empty?

        DataManager.write_json_file(supermarket, products)

        render json: {
          query: query,
          supermarket: supermarket,
          source: url,
          results: products,
        }, status: :ok
      rescue
        render json: { error: "An error occurred while processing the request" }, status: :internal_server_error
      end
    else
      json_data = DataManager.read_json_file(supermarket)

      if json_data
        render json: json_data, status: :ok
      else
        render json: { error: "Not found" }, status: :not_found
      end
    end
  end

  private

  # Validates the search parameters.
  #
  # @raise [ActionController::BadRequest] If the supermarket is invalid or the query is blank.
  def validate_search
    source = params[:supermarket]
    unless VALID_SHOPS.include?(source)
      render json: { error: "Invalid supermarket source" }, status: :bad_request
      return
    end

    if params[:q].blank?
      render json: { error: "Query parameter is required" }, status: :bad_request
      return
    end
  end
end
