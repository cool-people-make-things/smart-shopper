#!/bin/bash

echo "-- Running all RSpec tests..."
bundle exec rspec --format documentation
echo "-- Completed all RSpec tests"