class WebScraper

  # Generates a URL for the specified supermarket and query.
  #
  # @param supermarket [String] The name of the supermarket (e.g., "nw").
  # @param query [String] The search query to append to the URL.
  # @return [String] The generated URL for the supermarket search.
  def self.get_url(supermarket, query)
    case supermarket
    when "nw"
      "https://www.newworld.co.nz/shop/search?q=#{query}&pg=1"
    when "pns"
      "https://www.paknsave.co.nz/shop/search?pg=1&q=#{query}"
    else
      raise ArgumentError, "Unknown supermarket: #{supermarket}"
    end
  end

  # Fetches the HTML content of the specified URL using Selenium WebDriver.
  #
  # @param url [String] The URL to fetch.
  # @return [String] The HTML content of the page.
  def self.fetch_html(url)
    driver = get_webdriver

    # Adds a script to the page to redefine the 'webdriver' property
    # This helps avoid issues with sites that block automated browsing
    driver.execute_cdp("Page.addScriptToEvaluateOnNewDocument", source: <<~JS)
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined
      })
    JS

    begin
      driver.navigate.to(url)

      # Wait for 2 seconds or until the page source loads the expected content
      Selenium::WebDriver::Wait.new(timeout: 2).until do
        driver.page_source.include?("Search results for") ||
          driver.find_elements(id: "search").any?
      end

      driver.page_source
    rescue Selenium::WebDriver::Error::TimeoutError => e
      raise "Timeout while waiting for page to load: #{e.message}"
    rescue Selenium::WebDriver::Error::WebDriverError => e
      raise "WebDriver error occurred: #{e.message}"
    rescue StandardError => e
      raise "An error occurred while fetching HTML: #{e.message}"
    ensure
      driver.quit
    end
  end

  private

  # Initializes a Selenium WebDriver instance with Chrome options.
  #
  # @return [Selenium::WebDriver] The initialized WebDriver instance.
  def self.get_webdriver
    Selenium::WebDriver.for(:chrome, options: get_browser_options)
  rescue Selenium::WebDriver::Error::WebDriverError => e
    raise "Failed to initialize WebDriver: #{e.message}"
  rescue StandardError => e
    raise "An error occurred while initializing WebDriver: #{e.message}"
  end

  # Returns the browser options for the Selenium WebDriver.
  #
  # @return [Selenium::WebDriver::Chrome::Options] The configured browser options.
  def self.get_browser_options
    options = Selenium::WebDriver::Chrome::Options.new

    # path for chromium on docker
    options.binary = "/usr/bin/chromium"
    unless File.exist?(options.binary)
      raise "Chromium binary not found at #{options.binary}."
    end

    # ---- Some of these may be unnecessary, but they help with performance etc --
    options.add_argument("--headless=new") # new headless mode for compatibility
    options.add_argument("--disable-gpu") # disable hardware acceleration
    options.add_argument("--disable-dev-shm-usage") # fix limited resource problems in docker
    options.add_argument("--no-sandbox") # disable the sandbox for security reasons
    options.add_argument("--disable-blink-features=AutomationControlled") # disable automation features for stealth
    # ----

    # A common browser user agent, to avoid rejection by the site
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) " \
    "AppleWebKit/537.36 (KHTML, like Gecko) " \
    "Chrome/114.0.0.0 Safari/537.36")

    options
  end
end
