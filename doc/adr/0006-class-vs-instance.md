# 6. Class vs Instance

Date: 2025-07-20

## Status

Accepted

## Context

When writing our scraper classes, there is little difference (in our case) between using a class or an instance. We have a mixture of both in our codebase, and we need to decide which to use going forward.

The main difference is that a class is a blueprint for creating objects, while an instance is a specific object created from that blueprint. Instances can hold state and have methods that operate on that state, while classes are more static and operate more as functions or utilities.

There is little difference in how we use them in our code, but we need to choose one to maintain consistency.

Considerations include:

- Ease of use / readability
- Performance
- Testability

There are no significant performance differences in our case, and both classes and instances can be tested effectively.

In terms of readability, instances are similar to stateful components in React, but classes are more like holders in functional programming where data passes through functions without needing to manage state.

Reading through opinions of other ruby devs, classes are often preferred for utility-like components that don't need to maintain state and as state can easily be removed from our existing instances without impacting functionality, we can refactor our code to use classes instead in line with this.

## Decision

We will use classes over instances for our scraper components.

This means that code that looks like this currently:

```ruby
# controllers/search_controller.rb
class SearchController < ApplicationController
  def index
    ...
    html = WebScraper.get_html(url)

    parser = Parser.new(html)
    products = parser.parse
    ...
  end
end

# services/parser.rb
class Parser
  def initialize(html)
    @doc = Nokogiri::HTML(html)
  end

  def parse
    title = @doc.title
    products = get_products
    ...
  end

  private

  def get_products
    filter_menu = @doc.at_css("[data-testid='selected-refinements']")
    ...
  end
end
```

will be refactored to look like this:

```ruby
# controllers/search_controller.rb
class SearchController < ApplicationController
  def index
    ...
    html = WebScraper.get_html(url)
    products = Parser.parse(html)
    ...
  end
end

# services/parser.rb
class Parser
  def self.parse(html)
    doc = Nokogiri::HTML(html)
    title = doc.title
    products = get_products(doc)
    ...
  end

  private

  def self.get_products(doc)
    filter_menu = doc.at_css("[data-testid='selected-refinements']")
    ...
  end
end
```

## Consequences

This will promote consistency across our backend code, and aligns with previous experience in functional programming. It will make it easier to test this as we can treat our scraper components more like utility functions that operate on data rather than stateful objects.
