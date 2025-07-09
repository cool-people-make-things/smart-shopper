class SearchController < ApplicationController
  VALID_SHOPS = %w[nw pns wls]
  before_action :validate_search

  def validate_search
    source = params[:supermarket]
    unless VALID_SHOPS.include?(source)
      render json: { error: 'Invalid supermarket source' }, status: :bad_request
      return
    end

    if params[:q].blank?
      render json: { error: 'Query parameter is required' }, status: :bad_request
      return
    end
  end
  
  def index
    query = params[:q]
    supermarket = params[:supermarket]
    json_path = Rails.root.join('app', 'assets', 'data', "#{supermarket}.json")

    if File.exist?(json_path)
      render json: {
        query: query,
        supermarket: supermarket,
        data: JSON.parse(File.read(json_path))
      }, status: :ok
    else
      render json: { error: 'Not found' }, status: :not_found
    end
  end
end
