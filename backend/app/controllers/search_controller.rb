class SearchController < ApplicationController
  VALID_SHOPS = %w[nw pns wls]
  before_action :validate_search

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

  def index
    query = params[:q]
    supermarket = params[:supermarket]

    puts "---> Searching for '#{query}' in #{supermarket} supermarket"

    # TO BE REMOVED: once all scrapers working, we should check against VALID_SHOPS instead
    temp_supermarkets = %w[nw putYoursHere]

    if temp_supermarkets.include?(supermarket)
      url = WebScraper.get_url(supermarket, query)
      html = WebScraper.fetch_html(url)
      DataManager.write_html_file(supermarket, html)

      # Use the appropriate parser service based on the supermarket
      parser = case supermarket
        when "nw"
          NewWorldParser
        end

      products = parser.get_products(html)
      DataManager.write_json_file(supermarket, products)

      render json: {
        query: query,
        supermarket: supermarket,
        source: url,
        results: products,
      }, status: :ok
    else
      json_data = DataManager.read_json_file(supermarket)

      if json_data
        render json: {
          query: query,
          supermarket: supermarket,
          data: JSON.parse(json_data),
        }, status: :ok
      else
        render json: { error: "Not found" }, status: :not_found
      end
    end
  end
end
