class DataManager
  VALID_SUPERMARKETS = %w[nw pns wls]

  # Reads the HTML file for the specified supermarket.
  #
  # @param supermarket [String] The supermarket identifier.
  # @return [JSON || nil] The JSON content or nil if the file does not exist.
  def self.read_json_file(supermarket)
    validate_supermarket!(supermarket) # <= ! for DANGER
    json_path = Rails.root.join("app", "assets", "data", "#{supermarket}.json")

    File.exist?(json_path) ? File.read(json_path) : nil
  rescue => e
    warn "Error reading JSON file: #{e.message}"
    nil
  end

  # Writes the HTML content to a file for the specified supermarket.
  #
  # @param supermarket [String] The supermarket identifier.
  # @param data [String] The HTML content to write.
  def self.write_html_file(supermarket, data)
    if Rails.env.development?
      validate_supermarket!(supermarket)
      html_path = Rails.root.join("app", "assets", "data", "#{supermarket}_actual.html")

      File.write(html_path, data)
      puts "-----> Saved HTML to #{html_path}"
    end
  rescue => e
    warn "Error writing HTML file: #{e.message}"
  end

  # Writes the JSON data to a file for the specified supermarket.
  #
  # @param supermarket [String] The supermarket identifier.
  # @param data [Hash] The data to write as JSON.
  def self.write_json_file(supermarket, data)
    if Rails.env.development?
      validate_supermarket!(supermarket)
      json_path = Rails.root.join("app", "assets", "data", "#{supermarket}_actual.json")

      File.write(json_path, JSON.pretty_generate(data))
      puts "-----> Saved JSON to #{json_path}"
    end
  rescue => e
    warn "Error writing JSON file: #{e.message}"
  end

  private

  # Validates the supermarket identifier.
  #
  # @param supermarket [String] The supermarket identifier.
  # @raise [ArgumentError] If the supermarket is not recognized.
  def self.validate_supermarket!(supermarket)
    unless VALID_SUPERMARKETS.include?(supermarket)
      raise ArgumentError, "Unknown supermarket: #{supermarket}"
    end
  end
end
