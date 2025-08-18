require "rails_helper"
require_relative "../fixtures/nw_curated"

NW_DEAL_TYPES = [
  "Normal",
  "Normal Unitless",
  "Super Saver",
  "Super Saver Multibuy",
  "Super Saver Limit",
  "Club Deal",
  "Club Deal Multibuy",
  "Club Deal Limit",
  "Everyday Low",
  "Promo Unitless",
]

RSpec.describe NewWorldParser do
  include MockTestData
  describe "get_products" do
    context "when parsing curated html" do
      before(:all) do
        temp_html_path = Rails.root.join("spec", "fixtures", "nw_curated.html")
        html = File.read(temp_html_path)

        @actual_products = NewWorldParser.get_products(html)
        @nw_mock_results_array = MockTestData::NW_RETURN_OBJ[:results]
      end

      it "returns the correct number of products" do
        expect(@actual_products.size).to eq(@nw_mock_results_array.size)
        expect(@actual_products.size).to eq(NW_DEAL_TYPES.size)
      end

      it "correctly formats product type: Normal" do
        normal_product = @actual_products.find { |product| product[:id] == "5331318" }
        expect(normal_product[:id]).to eq(MockTestData::NW_NORMAL_OBJ[:id])
        expect(normal_product[:title]).to eq(MockTestData::NW_NORMAL_OBJ[:title])
        expect(normal_product[:promo]).to eq(nil)
        expect(normal_product[:price][:unit]).not_to eq(nil)
        expect(normal_product[:price][:unitPrice]).not_to eq(nil)
      end
      it "correctly formats product type: Normal Unitless" do
        normal_unitless_product = @actual_products.find { |product| product[:id] == "5039956" }
        expect(normal_unitless_product[:id]).to eq(MockTestData::NW_NORMAL_UNITLESS_OBJ[:id])
        expect(normal_unitless_product[:title]).to eq(MockTestData::NW_NORMAL_UNITLESS_OBJ[:title])
        expect(normal_unitless_product[:promo]).to eq(nil)
        expect(normal_unitless_product[:price][:unit]).to eq(nil)
        expect(normal_unitless_product[:price][:unitPrice]).to eq(nil)
      end
      it "correctly formats product type: Super Saver" do
        super_saver_product = @actual_products.find { |product| product[:id] == "5039976" }
        expect(super_saver_product[:id]).to eq(MockTestData::NW_SUPER_SAVER[:id])
        expect(super_saver_product[:title]).to eq(MockTestData::NW_SUPER_SAVER[:title])
        expect(super_saver_product[:promo][:tag]).to eq(MockTestData::NW_SUPER_SAVER[:promo][:tag])
      end
      it "correctly formats product type: Super Saver Multibuy" do
        super_saver_multibuy_product = @actual_products.find { |product| product[:id] == "5020662" }
        expect(super_saver_multibuy_product[:id]).to eq(MockTestData::NW_SUPER_SAVER_MULTIBUY_OBJ[:id])
        expect(super_saver_multibuy_product[:title]).to eq(MockTestData::NW_SUPER_SAVER_MULTIBUY_OBJ[:title])
        expect(super_saver_multibuy_product[:promo][:multibuyThreshold]).to eq(MockTestData::NW_SUPER_SAVER_MULTIBUY_OBJ[:promo][:multibuyThreshold])
        expect(super_saver_multibuy_product[:promo][:tag]).to eq(MockTestData::NW_SUPER_SAVER_MULTIBUY_OBJ[:promo][:tag])
      end
      it "correctly formats product type: Super Saver Limit" do
        super_saver_limit_product = @actual_products.find { |product| product[:id] == "5001548" }
        expect(super_saver_limit_product[:id]).to eq(MockTestData::NW_SUPER_SAVER_LIMIT_OBJ[:id])
        expect(super_saver_limit_product[:title]).to eq(MockTestData::NW_SUPER_SAVER_LIMIT_OBJ[:title])
        expect(super_saver_limit_product[:promo][:limit]).to eq(MockTestData::NW_SUPER_SAVER_LIMIT_OBJ[:promo][:limit])
        expect(super_saver_limit_product[:promo][:tag]).to eq(MockTestData::NW_SUPER_SAVER_LIMIT_OBJ[:promo][:tag])
      end
      it "correctly formats product type: Club Deal" do
        club_deal_product = @actual_products.find { |product| product[:id] == "5010998" }
        expect(club_deal_product[:id]).to eq(MockTestData::NW_CLUB_DEAL_OBJ[:id])
        expect(club_deal_product[:title]).to eq(MockTestData::NW_CLUB_DEAL_OBJ[:title])
        expect(club_deal_product[:promo][:tag]).to eq(MockTestData::NW_CLUB_DEAL_OBJ[:promo][:tag])
      end
      it "correctly formats product type: Club Deal Multibuy" do
        club_deal_multibuy_product = @actual_products.find { |product| product[:id] == "5010717" }
        expect(club_deal_multibuy_product[:id]).to eq(MockTestData::NW_CLUB_DEAL_MULTIBUY_OBJ[:id])
        expect(club_deal_multibuy_product[:title]).to eq(MockTestData::NW_CLUB_DEAL_MULTIBUY_OBJ[:title])
        expect(club_deal_multibuy_product[:promo][:multibuyThreshold]).to eq(MockTestData::NW_CLUB_DEAL_MULTIBUY_OBJ[:promo][:multibuyThreshold])
        expect(club_deal_multibuy_product[:promo][:tag]).to eq(MockTestData::NW_CLUB_DEAL_MULTIBUY_OBJ[:promo][:tag])
      end
      it "correctly formats product type: Club Deal Limit" do
        club_deal_limit_product = @actual_products.find { |product| product[:id] == "5318693" }
        expect(club_deal_limit_product[:id]).to eq(MockTestData::NW_CLUB_DEAL_LIMIT_OBJ[:id])
        expect(club_deal_limit_product[:title]).to eq(MockTestData::NW_CLUB_DEAL_LIMIT_OBJ[:title])
        expect(club_deal_limit_product[:promo][:limit]).to eq(MockTestData::NW_CLUB_DEAL_LIMIT_OBJ[:promo][:limit])
        expect(club_deal_limit_product[:promo][:tag]).to eq(MockTestData::NW_CLUB_DEAL_LIMIT_OBJ[:promo][:tag])
      end
      it "correctly formats product type: Everyday Low" do
        everyday_low_product = @actual_products.find { |product| product[:id] == "5008561" }
        expect(everyday_low_product[:id]).to eq(MockTestData::NW_EVERYDAY_LOW_OBJ[:id])
        expect(everyday_low_product[:title]).to eq(MockTestData::NW_EVERYDAY_LOW_OBJ[:title])
        expect(everyday_low_product[:promo][:tag]).to eq(MockTestData::NW_EVERYDAY_LOW_OBJ[:promo][:tag])
      end
      it "correctly formats product type: Promo Unitless" do
        promo_unitless_product = @actual_products.find { |product| product[:id] == "5028110" }
        expect(promo_unitless_product[:id]).to eq(MockTestData::NW_PROMO_UNITLESS_OBJ[:id])
        expect(promo_unitless_product[:title]).to eq(MockTestData::NW_PROMO_UNITLESS_OBJ[:title])
        expect(promo_unitless_product[:promo][:tag]).to eq(MockTestData::NW_PROMO_UNITLESS_OBJ[:promo][:tag])
        expect(promo_unitless_product[:price][:unit]).to eq(nil)
        expect(promo_unitless_product[:price][:unitPrice]).to eq(nil)
      end
    end
  end
end
