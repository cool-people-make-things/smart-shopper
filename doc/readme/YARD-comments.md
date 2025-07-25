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

- If multiple types are possible, you can use the `||` operator to indicate this - e.g. `@return [String || nil]` for a method that returns nil sometimes, but is expected to return a String usually (String goes first).

- If a pre-defined frontend type is returned, use that type instead of the raw Hash structure.

- Generally, if a Hash object is returned, document the keys.

- If an Array is returned, document the type of the items in the array.

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

### Hash, with more complex structure

In this example we have a more complex structure, so we document the keys in the Hash to make it clear what each key represents.

Depending on the complexity of the structure, you may want to break it down further or provide more detail, but this is a good starting point as more complex structures are likely predefined types.

```ruby
# fetch_product - Retrieves product details from the database
#
# @param product_id [Integer] The ID of the product to fetch
# @return [Hash] Product object
#   :id [Integer] The ID of the product
#   :title [String] The product name
#   :categories [Array<String>] The categories the product belongs to
#   :price [Hash] :amount, :currency, :onSale
#   :stock [Hash] :available, :quantity
def fetch_product(product_id)
  {
    id: product_id,
    title: "Sample Product",
    categories: ["electronics", "gadgets"],
    price: {
      amount: 19.99,
      currency: "USD",
      onSale: false
    },
    stock: {
      available: true,
      quantity: 100
    },
  }
end
```

### Multiple parameters and return types

```ruby
# calculate_discount - Works out the discount details for a product
#
# @param price [Float] The original price
# @param discount_rate [Float] The discount rate as a percentage (0-100)
# @return [Hash] Discount details
#   :original_price [Float] Starting price before discount
#   :discount_amount [Float] Amount removed from the original price
#   :final_price [Float] Price after applying the discount
def calculate_discount(price, discount_rate)
  discount_amount = price * (discount_rate / 100.0)
  final_price = price - discount_amount

  {
    original_price: price,
    discount_amount: discount_amount,
    final_price: final_price
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
```
