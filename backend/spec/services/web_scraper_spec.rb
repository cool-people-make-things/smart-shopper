require "rails_helper"

RSpec.describe WebScraper do
  describe ".get_url" do
    it "returns the correct URL for all supermarkets" do
      expect(WebScraper.get_url("nw", "milk")).to eq("https://www.newworld.co.nz/shop/search?q=milk&pg=1")
      expect(WebScraper.get_url("pns", "milk")).to eq("https://www.paknsave.co.nz/shop/search?pg=1&q=milk")
      expect(WebScraper.get_url("wls", "milk")).to eq("https://www.woolworths.co.nz/shop/searchproducts?search=milk")
    end
    it "returns nil and logs an error when an invalid supermarket is used" do
      expect(Log).to receive(:error).with("Unknown supermarket: countdown")
      expect(described_class.get_url("countdown", "cheese")).to be_nil
    end
  end

  describe ".fetch_html" do
    # Mock the Selenium WebDriver to avoid actual browser interaction
    let(:driver_double) { double(Selenium::WebDriver::Driver) }
    test_url = "https://supermarket.com/products"

    before do
      # Mock the WebDriver to return a double
      allow(WebScraper).to receive(:get_webdriver).and_return(driver_double)
      # Mock the methods on the driver double
      allow(driver_double).to receive(:execute_cdp)
      allow(driver_double).to receive(:navigate).and_return(driver_double)
      allow(driver_double).to receive(:to)

      # simulate loaded HTML
      allow(driver_double).to receive(:page_source).and_return(
        "<html><body>Search results for items</body></html>"
      )

      # simulate checking for DOM elements
      allow(driver_double).to receive(:find_elements).and_return([])

      allow(driver_double).to receive(:quit)
      allow(Log).to receive(:error)
    end

    it "navigates to the correct URL and returns HTML" do
      returned_html = WebScraper.fetch_html(test_url)

      # navigated to the correct URL
      expect(driver_double).to have_received(:to).with(test_url)

      expect(returned_html).to include("Search results for")
      expect(driver_double).to have_received(:quit)
    end

    it "rescues TimeoutError and logs it" do
      allow(driver_double).to receive(:to).and_raise(Selenium::WebDriver::Error::TimeoutError.new("too slow"))

      WebScraper.fetch_html(test_url)

      expect(Log).to have_received(:error).with(/Timeout while waiting for page to load: too slow/)
      expect(driver_double).to have_received(:quit)
    end

    it "rescues WebDriverError and logs it" do
      allow(driver_double).to receive(:to).and_raise(Selenium::WebDriver::Error::WebDriverError.new("bad driver"))

      WebScraper.fetch_html(test_url)

      expect(Log).to have_received(:error).with(/WebDriver error occurred: bad driver/)
      expect(driver_double).to have_received(:quit)
    end

    it "rescues StandardError and logs it" do
      allow(driver_double).to receive(:to).and_raise(StandardError.new("oops"))

      WebScraper.fetch_html(test_url)

      expect(Log).to have_received(:error).with(/An error occurred while fetching HTML: oops/)
      expect(driver_double).to have_received(:quit)
    end
  end

  describe ".get_webdriver" do
    let(:driver_double) { double("Selenium WebDriver") }

    before do
      allow(Log).to receive(:error)
    end

    it "rescues WebDriverError and logs it" do
      allow(Selenium::WebDriver).to receive(:for).and_raise(Selenium::WebDriver::Error::WebDriverError.new("web driver bad"))
      WebScraper.get_webdriver

      expect(Log).to have_received(:error).with(/Failed to initialize WebDriver: web driver bad/)
    end

    it "rescues StandardError and logs it" do
      allow(Selenium::WebDriver).to receive(:for).and_raise(StandardError.new("insert generic error message"))
      WebScraper.get_webdriver

      expect(Log).to have_received(:error).with(/An error occurred while initializing WebDriver: insert generic error message/)
    end
  end
end
