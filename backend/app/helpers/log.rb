class Log

  # debug - development messages
  #
  # @param message [String] The message to log
  def self.debug(message)
    Rails.logger.debug("--> DEBUG: #{message}") if dev?
  end

  # info - general information
  #
  # @param message [String] The message to log
  def self.info(message)
    Rails.logger.info("--> INFO : #{message}") if non_prod?
  end

  # warn - non-breaking messages for potential issues to note
  #
  # @param message [String] The message to log
  def self.warn(message)
    Rails.logger.warn("--> WARN! #{message}") if non_prod?
  end

  # error - critical messages, can propagate further in case of failure
  #
  # @param message [String, Exception] The error message or exception to log
  # @param propagate [Boolean] Defaults to TRUE, raising the error for further handling
  def self.error(message, propagate: true)
    Rails.logger.error("--> ERR!! #{message}")
    if propagate
      raise message.is_a?(Exception) ? message : StandardError.new(message)
    end
  end

  private

  # dev? - Checks if the current environment is development
  #
  # @return [Boolean] TRUE if in development
  def self.dev?
    Rails.env.development?
  end

  # non_prod? - Checks if the current environment is non-production (development or test)
  #
  # @return [Boolean] TRUE if in development or test
  def self.non_prod?
    Rails.env.development? || Rails.env.test?
  end
end
