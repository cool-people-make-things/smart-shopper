require "rails_helper"
require_relative "../fixtures/wls_curated"

DEAL_TYPES = [
  "Member Price",
  "Normal",
  "Special",
  "Low Price",
  "Special w Multi-Buy",
  "Disney Disc w Special",
  "Low Price w Multi-Buy",
  "Disney Disc",
  "Fresh Deal Multi-Buy",
  "Unitless Promo",
  "Unitless Normal",
]

RSpec.describe WoolworthsParser do
  describe "get_products" do
    context "when parsing curated html" do
      before(:all) do
        temp_html_path = Rails.root.join("spec", "fixtures", "wls_curated.html")
        html = File.read(temp_html_path)

        @actual_products = WoolworthsParser.get_products(html)
        @wls_mock_results_array = MockTestData::WLS_RETURN_OBJ[:results]
      end

      it "returns the correct number of products" do
        expect(@actual_products.size).to eq(@wls_mock_results_array.size)
        expect(@actual_products.size).to eq(DEAL_TYPES.size)
      end

      # Currently iterating by index so the curated fixture needs to stay in the same order as the DEAL_TYPES array
      DEAL_TYPES.each_with_index do |deal, idx|
        it "correctly formats product type: #{deal}" do
          expected = @wls_mock_results_array[idx]
          actual = @actual_products[idx]

          expect(actual[:title]).to eq(expected[:title])
          expect(actual[:amt]).to eq(expected[:amt])
          expect(actual[:image]).to eq(expected[:image])
          expect(actual[:productPageUrl]).to eq(expected[:productPageUrl])
          expect(actual[:price]).to eq(expected[:price])
          expect(actual[:promo]).to eq(expected[:promo])
        end
      end

      it "correctly returns all data" do
        expect(@actual_products).to eq(@wls_mock_results_array)
      end
    end
  end
end
