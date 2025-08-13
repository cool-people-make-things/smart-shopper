require "rails_helper"

RSpec.describe "Search API", type: :request do
  describe "GET /api/v1/search/:supermarket" do
    let(:query) { "butter" }
    let(:supermarket) { "test_shop" }
    let(:file_path) { Rails.root.join("app", "assets", "data", "#{supermarket}.json") }

    context "with invalid supermarket" do
      it "returns 400 Bad Request" do
        get "/api/v1/search/invalid", params: { q: query }

        expect(response).to have_http_status(:bad_request)
        expect(response.parsed_body).to eq({ "error" => "Invalid supermarket source" })
      end
    end

    context "with missing query" do
      it "returns 400 Bad Request" do
        get "/api/v1/search/#{supermarket}"  # no `q` param

        expect(response).to have_http_status(:bad_request)
        expect(response.parsed_body).to eq({ "error" => "Query parameter is required" })
      end
    end

    context "when supermarket is valid and file exists" do
      before do
        FileUtils.mkdir_p(File.dirname(file_path))
        File.write(file_path, [{ name: "Butter", price: 9.5 }].to_json)
      end

      after do
        File.delete(file_path) if File.exist?(file_path)
      end

      it "returns cached data with 200 OK" do
        get "/api/v1/search/#{supermarket}", params: { q: query }

        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to eq([{ "name" => "Butter", "price" => 9.5 }])
      end
    end

    context "when supermarket is valid but file is missing" do
      before do
        File.delete(file_path) if File.exist?(file_path)
      end

      it "returns 404 Not Found" do
        get "/api/v1/search/#{supermarket}", params: { q: query }

        expect(response).to have_http_status(:not_found)
        expect(response.parsed_body).to eq({ "error" => "Not found" })
      end
    end
  end
end
