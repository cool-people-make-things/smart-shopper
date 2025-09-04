class StrUtils
  def self.to_title_case(str)
    special_cases = {
      "nz" => "NZ",
      "x" => "x",
    }

    str.split.map { |word| special_cases[word] || capitalise(word) }.join(" ")
  end

  def self.capitalise(str)
    str[0].upcase + str[1..]
  end
end
