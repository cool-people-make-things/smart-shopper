require "rails_helper"

RSpec.describe "Search API", type: :request do
  describe "GET /api/v1/search/:supermarket" do
    let(:query) { "butter" }
    let(:url) { "http://example.com/search?q=#{query}" }
    let(:html) { "<html>mock html</html>" }
    let(:products) { [{ name: "Butter", price: 9.5 }] }

    # Shared example for valid supermarkets
    shared_examples "valid supermarket request" do |supermarket, parser_class|
      before do
        allow(WebScraper).to receive(:get_url).with(supermarket, query).and_return(url)
        allow(WebScraper).to receive(:fetch_html).with(url).and_return(html)
        allow(DataManager).to receive(:write_html_file)
        allow(DataManager).to receive(:write_json_file)
        allow(parser_class).to receive(:get_products).with(html).and_return(products)
      end

      it "returns 200 OK with parsed products" do
        get "/api/v1/search/#{supermarket}", params: { q: query }

        expect(response).to have_http_status(:ok)
        body = response.parsed_body
        expect(body["query"]).to eq(query)
        expect(body["supermarket"]).to eq(supermarket)
        expect(body["source"]).to eq(url)
        expect(body["results"]).to eq(products.map(&:stringify_keys))
      end
    end

    # Run shared examples for each valid supermarket
    include_examples "valid supermarket request", "nw", NewWorldParser
    include_examples "valid supermarket request", "pns", PaknsaveParser
    include_examples "valid supermarket request", "wls", WoolworthsParser

    context "with invalid supermarket" do
      it "returns 400 Bad Request" do
        get "/api/v1/search/invalid", params: { q: query }

        expect(response).to have_http_status(:bad_request)
        expect(response.parsed_body).to eq({ "error" => "Invalid supermarket source" })
      end
    end

    context "with missing query" do
      it "returns 400 Bad Request" do
        get "/api/v1/search/nw" # no q param

        expect(response).to have_http_status(:bad_request)
        expect(response.parsed_body).to eq({ "error" => "Query parameter is required" })
      end
    end

    context "when parser returns empty products" do
      before do
        allow(WebScraper).to receive(:get_url).and_return(url)
        allow(WebScraper).to receive(:fetch_html).and_return(html)
        allow(NewWorldParser).to receive(:get_products).and_return([])
        allow(DataManager).to receive(:write_html_file)
        allow(DataManager).to receive(:write_json_file)
      end

      it "returns 200 OK with empty array" do
        get "/api/v1/search/nw", params: { q: query }

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body["results"]).to eq([])
      end
    end

    context "when an exception is raised" do
      before do
        allow(WebScraper).to receive(:get_url).and_raise(StandardError, "network fail")
      end

      it "returns 500 Internal Server Error" do
        get "/api/v1/search/nw", params: { q: query }

        expect(response).to have_http_status(:internal_server_error)
        expect(response.parsed_body).to eq({ "error" => "An error occurred while processing the request" })
      end
    end
  end
end
