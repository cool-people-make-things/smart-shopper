require "rails_helper"
require_relative "../fixtures/pns_curated"

PNS_DEAL_TYPES = [
  "Normal",
  "Multibuy",
  "Limit",
  "Extra Low",
]

RSpec.describe PaknsaveParser do
  include MockTestData
  describe "get_products" do
    context "when parsing curated html" do
      before(:all) do
        temp_html_path = Rails.root.join("spec", "fixtures", "pns_curated.html")
        html = File.read(temp_html_path)

        @actual_products = PaknsaveParser.get_products(html)
        @pns_mock_results_array = MockTestData::PNS_RETURN_OBJ[:results]
      end

      it "returns the correct number of products" do
        expect(@actual_products.size).to eq(@pns_mock_results_array.size)
        expect(@actual_products.size).to eq(PNS_DEAL_TYPES.size)
      end

      it "correctly formats product type: Multi-buy" do
        multibuy_product = @actual_products.find { |deal| deal[:promo][:multibuyThreshold] }
        expect(multibuy_product[:id]).to eq(MockTestData::PNS_MULTIBUY_OBJ[:id])
        expect(multibuy_product[:title]).to eq(MockTestData::PNS_MULTIBUY_OBJ[:title])
        expect(multibuy_product[:promo][:multibuyThreshold]).to eq(MockTestData::PNS_MULTIBUY_OBJ[:promo][:multibuyThreshold])
      end

      it "correctly formats product type: Limit" do
        limit_product = @actual_products.find { |deal| deal[:promo][:limit] }
        expect(limit_product[:id]).to eq(MockTestData::PNS_LIMIT_OBJ[:id])
        expect(limit_product[:title]).to eq(MockTestData::PNS_LIMIT_OBJ[:title])
        expect(limit_product[:promo][:limit]).to eq(MockTestData::PNS_LIMIT_OBJ[:promo][:limit])
      end

      it "correctly formats product type: Extra Low" do
        extra_low_product = @actual_products.find { |deal| !deal[:promo][:limit] && !deal[:promo][:multibuyThreshold] }
        expect(extra_low_product[:id]).to eq(MockTestData::PNS_EXTRA_LOW_OBJ[:id])
        expect(extra_low_product[:title]).to eq(MockTestData::PNS_EXTRA_LOW_OBJ[:title])
        expect(extra_low_product[:promo][:tag]).to eq("Extra Low")
        expect(extra_low_product[:promo][:value]).to eq(nil)
      end

      it "correctly formats product type: Normal" do
        normal_product = @actual_products.find { |deal| !deal[:promo] }
        expect(normal_product[:id]).to eq(MockTestData::PNS_NORMAL_OBJ[:id])
        expect(normal_product[:title]).to eq(MockTestData::PNS_NORMAL_OBJ[:title])
        expect(normal_product[:promo]).to eq(nil)
      end

      it "correctly returns all data" do
        expect(@actual_products).to eq(@pns_mock_results_array)
      end
    end
  end
end
