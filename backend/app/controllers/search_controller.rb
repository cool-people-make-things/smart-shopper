class SearchController < ApplicationController
  VALID_SHOPS = %w[nw pns wls test_shop]
  before_action :validate_search!

  # search#index - Handles the search request for products from a specified supermarket
  #
  # @param q [String] The product search query
  # @param supermarket [String] The supermarket identifier
  # @return [JSON] The search results
  #   - query: The search query
  #   - supermarket: The supermarket identifier
  #   - source: The URL of the supermarket search
  #   - results: The array of products found
  def index
    query = params[:q]
    supermarket = params[:supermarket]

    Log.debug("Searching for '#{query}' in #{supermarket} supermarket")

    # TO BE REMOVED: once all scrapers working, we should check against VALID_SHOPS instead
    temp_supermarkets = %w[nw pns wls putYoursHere]

    if temp_supermarkets.include?(supermarket)
      begin
        url = WebScraper.get_url(supermarket, query)
        html = WebScraper.fetch_html(url)
        Log.error("No HTML returned") if html.blank?

        DataManager.write_html_file(supermarket, html)

        # Use the appropriate parser service based on the supermarket
        parser = case supermarket
          when "nw"
            NewWorldParser

          # when "wls"
          #   WoolworthsParser

          end

        products = parser.get_products(html)
        Log.warn("No products found") if products.empty?

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

  # validate_search! - Responds with an error if the supermarket or query is invalid
  #
  # @raise [ActionController::BadRequest] If the supermarket is not in the list of valid shops or if the query parameter is blank
  def validate_search!
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
