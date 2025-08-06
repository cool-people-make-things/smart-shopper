Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV.fetch('CORS_ORIGINS', '').split(',')

    resource '*',
      headers: :any,
      methods: [:get, :post, :patch, :put, :delete, :options, :head]
  end
end
