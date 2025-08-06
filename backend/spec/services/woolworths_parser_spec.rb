require "rails_helper"

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
]

RSpec.describe WoolworthsParser do
  describe "get_products" do
    context "when parsing curated html" do
      before(:all) do
        temp_html_path = Rails.root.join("spec", "fixtures", "wls_curated.html")
        html = File.read(temp_html_path)

        temp_json_path = Rails.root.join("spec", "fixtures", "wls_curated.json")
        json = JSON.parse(File.read(temp_json_path), symbolize_names: true)

        @expected_data = json[:results]
        @actual_products = WoolworthsParser.get_products(html)
      end

      it "returns the correct number of products" do
        expect(@actual_products.size).to eq(@expected_data.size)
        expect(@actual_products.size).to eq(DEAL_TYPES.size)
      end

      DEAL_TYPES.each_with_index do |deal, idx|
        it "correctly formats product type: #{deal}" do
          expected = @expected_data[idx]
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
        expect(@actual_products).to eq(@expected_data)
      end
    end
  end
end
