require "rails_helper"

RSpec.describe "GET /search/:supermarket" do
  context "with invalid supermarket" do
    it "returns 400 Bad Request" do
      get "/search/invalid", params: { q: "butter" }

      expect(response).to have_http_status(:bad_request)
      expect(response.parsed_body).to eq({ "error" => "Invalid supermarket source" })
    end
  end

  context "with missing query" do
    it "returns 400 Bad Request" do
      get "/search/nw"  # no `q` param

      expect(response).to have_http_status(:bad_request)
      expect(response.parsed_body).to eq({ "error" => "Query parameter is required" })
    end
  end

  let(:query) { "butter" }
  %w[nw pns wls].each do |supermarket|
    context "when supermarket is #{supermarket} and HTML is returned" do
      # This is a ruby/rails thing where it return with symbols so need to make the return have these lil arrows
      products = [{ "name" => "Butter", "price" => 9.5 }]

      let(:html) { "<html>Test Supermarket HTML</html>" }
      let(:products) { products }
      # Dynamically determine the parser based on the supermarket and check each one is returning the correct details
      let(:parser) do
        case supermarket
        when "nw" then NewWorldParser
        when "pns" then PaknsaveParser
        when "wls" then WoolworthsParser
        end
      end

      # Set up the mock environment for the WebScraper and DataManager
      before do
        allow(WebScraper).to receive(:get_url).and_return("http://test-supermarket.com")
        allow(WebScraper).to receive(:fetch_html).and_return(html)
        allow(DataManager).to receive(:write_html_file)
        allow(DataManager).to receive(:write_json_file)
        allow(parser).to receive(:get_products).and_return(products)
        allow(Log).to receive(:error)
        allow(Log).to receive(:warn)
      end

      it "returns the expected results and products" do
        get "/search/#{supermarket}", params: { q: query }

        # Check the response status and body is as expected
        expect(response).to have_http_status(:ok)
        body = response.parsed_body
        expect(body["query"]).to eq(query)
        expect(body["supermarket"]).to eq(supermarket)
        expect(body["source"]).to eq("http://test-supermarket.com")
        expect(body["results"]).to eq(products)

        # Check that the scrapers and data manager parsers are being called with the right stuff
        expect(WebScraper).to have_received(:get_url).with(supermarket, query)
        expect(WebScraper).to have_received(:fetch_html).with("http://test-supermarket.com")
        expect(DataManager).to have_received(:write_html_file).with(supermarket, html)
        expect(parser).to have_received(:get_products).with(html)
        expect(DataManager).to have_received(:write_json_file).with(supermarket, products)
      end
    end
  end

  context "when returned html is black" do
    let(:supermarket) { "wls" }

    before do
      allow(WebScraper).to receive(:get_url).and_return("http://test-supermarket.com")
      allow(WebScraper).to receive(:fetch_html).and_return("")
      allow(DataManager).to receive(:write_html_file)
      allow(Log).to receive(:error)
    end
    it "logs an error" do
      get "/search/#{supermarket}", params: { q: query }

      expect(Log).to have_received(:error).with("No HTML returned")
      expect(DataManager).to have_received(:write_html_file).with(supermarket, "")
    end
  end
end

RSpec.describe "Search API", type: :request do
  describe "GET /search/:supermarket" do
    let(:query) { "butter" }
    let(:supermarket) { "test_shop" }
    let(:products) { [{ "name" => "Butter", "price" => 9.5 }] }
    let(:json_data) { { "query" => query, "results" => products } }

    context "when supermarket is valid and file exists" do
      before do
        allow(DataManager).to receive(:read_json_file).with(supermarket).and_return(json_data)
      end

      it "returns the JSON data and 200" do
        get "/search/#{supermarket}", params: { q: query }

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to eq(json_data)
      end
    end

    context "when supermarket is valid but file is missing" do
      it "returns 404 Not Found" do
        get "/search/#{supermarket}", params: { q: query }

        expect(response).to have_http_status(:not_found)
        expect(response.parsed_body).to eq({ "error" => "Not found" })
      end
    end
  end
end
