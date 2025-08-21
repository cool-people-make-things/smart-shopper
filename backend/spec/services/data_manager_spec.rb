require "rails_helper"

json_mock_data = {
  "supermarket": "pns",
  "query": "butter",
  "source": "https://www.paknsave.co.nz/shop/search?pg=1&q=butter",
  "results": [
    {
      "id": "5004821",
      "title": "Rolling Meadow Butter",
      "amt": "500g",
      "image": "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5004821.png?w=384",
      "productPageUrl": "/shop/product/5004821_ea_000pns?name=rolling-meadow-butter",
      "price": {
        "value": "8.29",
        "unitPrice": "1.66",
        "unit": "100g",
      },
      "promo": {},
    },
  ],
}

RSpec.describe DataManager do
  describe ".read_json_file", skip: "function not currently used" do
    it "returns JSON content when file exists" do
      supermarket = "pns"
      json_path = Rails.root.join("app", "assets", "data", "#{supermarket}.json")

      allow(File).to receive(:exist?).with(json_path).and_return(true)
      allow(File).to receive(:read).with(json_path).and_return(json_mock_data)

      expect(DataManager.read_json_file(supermarket)).to eq(json_mock_data)
    end

    it "returns nil content when file doesnt exist" do
      supermarket = "pns"
      json_path = Rails.root.join("app", "assets", "data", "#{supermarket}.json")

      allow(File).to receive(:exist?).with(json_path).and_return(false)

      expect(DataManager.read_json_file(supermarket)).to be_nil
    end
    it "logs a warning when an error occurs" do
      supermarket = "pns"
      allow(File).to receive(:exist?).and_raise(StandardError.new("error reading file"))

      expect(Log).to receive(:warn).with("Error reading JSON file: error reading file")
      expect(DataManager.read_json_file(supermarket)).to be_nil
    end
  end
  describe ".write_html_file" do
    it "writes HTML to a file" do
      supermarket = "pns"
      html_mock_data = "<html>Test HTML</html>"
      html_path = Rails.root.join("app", "assets", "data", "#{supermarket}_actual.html")

      allow(Rails.env).to receive(:development?).and_return(true)
      allow(File).to receive(:write).with(html_path, html_mock_data)
      allow(Log).to receive(:debug)

      expect { DataManager.write_html_file(supermarket, html_mock_data) }.not_to raise_error
      expect(File).to have_received(:write).with(html_path, html_mock_data)
      expect(Log).to have_received(:debug).with("Saved HTML to #{html_path}")
    end
    it "logs an error when an error occurs" do
      supermarket = "pns"
      html_mock_data = "<html>Test HTML</html>"

      allow(Rails.env).to receive(:development?).and_return(true)
      allow(File).to receive(:write).and_raise(StandardError.new("error writing file"))

      expect(Log).to receive(:warn).with("Error writing HTML file: error writing file")
      expect { DataManager.write_html_file(supermarket, html_mock_data) }.not_to raise_error
    end
  end
  describe ".write_json_file" do
    it "writes JSON data to a file" do
      supermarket = "nw"

      json_path = Rails.root.join("app", "assets", "data", "#{supermarket}_actual.json")
      allow(Rails.env).to receive(:development?).and_return(true)
      allow(File).to receive(:write).with(json_path, JSON.pretty_generate(json_mock_data))
      allow(Log).to receive(:debug)

      expect { DataManager.write_json_file(supermarket, json_mock_data) }.not_to raise_error
      expect(File).to have_received(:write).with(json_path, JSON.pretty_generate(json_mock_data))
      expect(Log).to have_received(:debug).with("Saved JSON to #{json_path}")
    end
    it "logs an error when an error occurs" do
      supermarket = "nw"

      allow(Rails.env).to receive(:development?).and_return(true)
      allow(File).to receive(:write).and_raise(StandardError.new("error writing json"))

      expect(Log).to receive(:warn).with("Error writing JSON file: error writing json")
      expect { DataManager.write_json_file(supermarket, json_mock_data) }.not_to raise_error
    end
  end
  describe ".validate_supermarket!" do
    it "does not raise an error when a valid supermarket is used" do
      expect { DataManager.send(:validate_supermarket!, "nw") }.not_to raise_error
    end
    it "raises an error when an invalid supermarket is used" do
      expect { DataManager.send(:validate_supermarket!, "invalid") }.to raise_error("Unknown supermarket: invalid")
    end
  end
end
