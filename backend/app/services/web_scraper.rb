class WebScraper
  def self.get_url(supermarket, query)
    case supermarket
    when "nw"
      "https://www.newworld.co.nz/shop/search?q=#{query}&pg=1"
    else
      raise ArgumentError, "Unknown supermarket: #{supermarket}"
    end
  end

  def self.fetch_html(url)
    driver = Selenium::WebDriver.for(:chrome, options: get_browser_options)

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
    ensure
      driver.quit
    end
  end

  private

  def self.get_browser_options
    options = Selenium::WebDriver::Chrome::Options.new

    # path for chromium on docker
    options.binary = "/usr/bin/chromium"

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
