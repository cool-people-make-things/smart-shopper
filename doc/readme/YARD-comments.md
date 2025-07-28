<h3 align="center">YARD Comments</h3>

## Context

YARD comments are used to document Ruby code, making it easier for developers to understand the purpose and usage of code. There are specific guidelines for YARD comments and tools that can read and generate documentation from these comments, but we are using it more as a guideline.

We will use the basic structure of YARD comments in our codebase, with adaptations for our project.

## Guidelines

1. **Method Name**: Include the method name in the comment, so it is clear when skimming.
2. **Method Description**: Start with a brief description of what the method does.
3. **Parameters**: Use `@param` to describe each parameter, including its type and purpose.
4. **Return Value**: Use `@return` to describe the return value, including its type.
5. **Exceptions**: Use `@raise` to describe the exception that will be raised.
6. **Examples**: Use `@example` to provide usage examples, if useful.

### Notes

- Descriptions should be short and non-technical, focusing on what the method does rather than how it does it.

- If a pre-defined frontend type is returned, use that type instead of the raw Hash structure.

- Generally, if a Hash object is returned, document the keys.

- If an Array is returned, document the type of the items in the array.

- If multiple types are possible, you can use the `||` operator to indicate this - e.g. `@return [String || nil]` is expected to return a String (so String goes first), but sometimes returns nil.

- If a param or return value (etc) is optional, use `?` at the end of the key - e.g. `@param name? [String]` or `@return [Hash] :id, :name?` to indicate that `:name` is optional.

- If a Boolean is returned, describe what the boolean means, prioritising clarity, i.e. `@return [Boolean] TRUE if the user has a name`.

- If a methods _purpose_ is to raise an exception, document this using `@raise`. It is not necessary to include this tag for side effects of the method as most methods will raise some exceptions in our code.

## Examples

### Simple method

```ruby
# sum - Adds together two numbers
#
# @param a [Integer] The first number
# @param b [Integer] The second number
# @return [Integer] The sum of the two numbers
def sum(a, b)
  a + b
end
```

### Hash, simple structure

```ruby
# fetch_user_data - Retrieves user data from the database
#
# @return [Hash] User object
#   :name [String] The name of the user
#   :email [String] The email of the user
def fetch_user_data
  {
    name: "John Doe",
    email: "john.doe@example.com"
  }
end
```

### Array, with pre-defined type

See how the type of items in the array isn't described? This is because the type is already defined in the frontend code, so we can just use that type instead of laying out the whole Hash structure.

```ruby
# fetch_products - Gets products from the database
#
# @return [Array<Product>] List of products
def fetch_products
  [
    {
      name: "Product 1",
      price: 10.0,
      amount: 1,
      on_sale: true,
      currency: "USD"
    },
    {
      name: "Product 2",
      price: 20.0,
      amount: 2,
      on_sale: false,
      currency: "USD"
    }
  ]
end
```

### Booleans

The description tells us what the boolean means in context, and prioritises what information this gives us rather then describing both true and false.

In this example the method checks multiple things, so the boolean is only TRUE if all conditions are met. This is why we show TRUE in our `@return` tag rather than both TRUE and FALSE.

```ruby
# on_sale? - Checks if the product is considered on sale
#
# @param product [Product] The product to check
# @return [Boolean] TRUE if the sale is currently available
def on_sale?(product)
  if product[:quantity] == 0
    false
  elsif product[:promo].nil?
    false
  end

  promo_details = product[:promo]

  if promo_details[:discount].nil? || promo_details[:sale_expires].nil?
    return false
  end

  promo_details[:sale_expires] > Time.now
end
```

### Hash, complex structure

In this example we have a more complex structure, so we document the keys in the Hash to make it clear what each key represents.

Depending on the complexity of the structure, you may want to break it down further or provide more detail, but this is a good starting point as more complex structures are likely predefined types.

This example also shows optional keys, indicated by the `?` at the end of the key names.

```ruby
# fetch_product - Retrieves product details from the database
#
# @param product_id [Integer] The ID of the product to fetch
# @return [Hash] Product object
#   :id [Integer] The ID of the product
#   :title [String] The product name
#   :categories [Array<String>] The categories the product belongs to
#   :price [Hash] :amount, :currency, :onSale, :saleExpires
#   :stock [Hash] :available, :quantity
#   :amount? [Float] The amount of the product
def fetch_product(product_id)
  {
    id: product_id,
    title: "Sample Product",
    categories: ["electronics", "gadgets"],
    price: {
      amount: 19.99,
      currency: "USD",
      onSale: false,
      saleExpires: "2030-12-31"
    },
    stock: {
      available: true,
      quantity: 100
    },
  }
end
```

### Exception method - @raise

Side note: Notice the `!` at the end of the method name?

This indicates it raises an exception if validation fails. This is a common Ruby convention for methods whose purpose is to modify the state or raise exceptions. It says DANGER! Be careful.

```ruby
# validate_input! - Raises an error if the input is missing or empty
#
# @param input [String] The input from the user
# @raise [ArgumentError] If there is no input
def validate_input!(input)
  if input.nil? || input.empty?
    raise ArgumentError, "Input cannot be nil or empty"
  end
end
```

### Example with @example

Because sometimes it's easier to see how a method is used rather than just reading about it.

Useful if specific inputs are needed, or if the way it is used is not obvious.

```ruby
# format_date - Turns a date into a human-readable string
#
# @param date [Date] The date to format
# @return [String] The date string in "YYYY-MM-DD" format
#
# @example
#   format_date(Date.new(2023, 10, 5)) => "2023-10-05"
def format_date(date)
  date.strftime("%Y-%m-%d")
end

# get_modifier_function - Given a key, returns a func to modify a value respectively
#
# @param key [Symbol] The key to determine the modifier function
# @return [Proc] A function that takes a value and returns the modified value
#
# @example
#   modifier = get_modifier_function(:double)
#   modifier.call(5) => 10
#   modifier.call(3) => 6
def get_modifier_function(key)
  case key
  when :double
    Proc.new { |value| value * 2 }
  when :square
    Proc.new { |value| value ** 2 }
  else
    Proc.new { |value| value }
  end
end
```
