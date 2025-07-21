class DataManager
  def self.read_json_file(supermarket)
    json_path = Rails.root.join("app", "assets", "data", supermarket + ".json")
    File.exist?(json_path) ? File.read(json_path) : nil
  end

  def self.write_html_file(supermarket, data)
    if Rails.env.development?
      html_path = Rails.root.join("app", "assets", "data", supermarket + "_actual.html")
      File.write(html_path, data)
      puts "-----> Saved HTML to #{html_path}"
    end
  end

  def self.write_json_file(supermarket, data)
    if Rails.env.development?
      json_path = Rails.root.join("app", "assets", "data", supermarket + "_actual.json")
      File.write(json_path, JSON.pretty_generate(data))
      puts "-----> Saved JSON to #{json_path}"
    end
  end
end
