FROM ruby:3.4.1-bullseye

# Install system dependencies
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libpq-dev \
  nodejs \
  yarn \
  wget \
  unzip \
  xvfb \
  libnss3 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libxss1 \
  libasound2 \
  libgbm1 \
  libxshmfence1 \
  libu2f-udev \
  libvulkan1 \
  fonts-liberation \
  libappindicator3-1 \
  libnss3-tools \
  chromium

# Install ChromeDriver matching Chromium version
RUN apt-get update && apt-get install -y \
  chromium \
  chromium-driver

# Set working directory
WORKDIR /app

# Copy Gemfile + install gems
COPY Gemfile* ./
RUN bundle install

# Copy rest of the app
COPY . .

# Precompile assets if using Rails 8 asset pipeline
RUN RAILS_ENV=production bundle exec rails assets:precompile

# Expose the Render-assigned port
EXPOSE 10000

# Start Rails server by default
CMD ["bin/rails", "server", "-b", "0.0.0.0", "-p", "10000"]
