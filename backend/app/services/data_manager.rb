class DataManager
  VALID_SUPERMARKETS = %w[nw pns wls]

  # read_json_file - Reads the JSON file for the specified supermarket
  #
  # @param supermarket [String] The supermarket identifier
  # @return [JSON || nil] The JSON content or nil if the file does not exist
  def self.read_json_file(supermarket)
    validate_supermarket!(supermarket)
    json_path = Rails.root.join("app", "assets", "data", "#{supermarket}.json")

    File.exist?(json_path) ? File.read(json_path) : nil
  rescue => e
    Log.warn("Error reading JSON file: #{e.message}")
    nil
  end

  # write_html_file - Writes HTML to a file for the specific supermarket
  #
  # @param supermarket [String] The supermarket identifier
  # @param data [String] The HTML content to write
  def self.write_html_file(supermarket, data)
    if Rails.env.development?
      validate_supermarket!(supermarket)
      html_path = Rails.root.join("app", "assets", "data", "#{supermarket}_actual.html")

      File.write(html_path, data)
      Log.debug("Saved HTML to #{html_path}")
    end
  rescue => e
    Log.warn("Error writing HTML file: #{e.message}")
  end

  # write_json_file - Writes JSON data to a file for the specific supermarket
  #
  # @param supermarket [String] The supermarket identifier
  # @param data [Hash] The data to write
  def self.write_json_file(supermarket, data)
    if Rails.env.development?
      validate_supermarket!(supermarket)

      json_path = Rails.root.join("app", "assets", "data", "#{supermarket}_actual.json")

      File.write(json_path, JSON.pretty_generate(data))
      Log.debug("Saved JSON to #{json_path}")
    end
  rescue => e
    Log.warn("Error writing JSON file: #{e.message}")
  end

  private

  # validate_supermarket! - Checks that the supermarket is recognized
  #
  # @param supermarket [String] The supermarket identifier
  # @raise [ArgumentError] If the supermarket is not recognized
  def self.validate_supermarket!(supermarket)
    Log.error(ArgumentError, "Unknown supermarket: #{supermarket}") unless VALID_SUPERMARKETS.include?(supermarket)
  end
end
