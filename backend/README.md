<h3 align="center">Smart Shopper - Backend</h3>

### 📝 Table of Contents

- [Getting Started](#getting_started)
  - [Prerequisites](#prerequisites)
    - [Ruby, Rails, and Docker](#ruby_rails_docker)
    - [VSCode Extensions](#vscode_extensions)
- [Running Locally](#running_locally)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [FYI Documents](#fyi-documents)


[~ Project /README.md](/README.md)

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites <a name = "prerequisites"></a>

Before running following commands, check for the correct ruby and docker versions. You can find these in [tool-versions](../.tool-versions).

#### Ruby, Rails, and Docker <a name = "ruby_rails_docker"></a>

Check if Ruby, Gem, and Rails are available:

```sh
ruby -v && gem -v && rails -v
```

Check if Docker and Docker-Compose are available:

```sh
docker -v && docker compose version
```

If you don't have the above available to your command line, follow the install steps provided (or official documentation):

- [Install Ruby and Rails](../doc/readme/Install-ruby-rails.md)
- [Install Docker and Docker-Compose](../doc/readme/Install-docker.md)

#### VSCode Extensions <a name = "vscode_extensions"></a>

The backend code uses the following tool extensions in VSCode:

- [Ruby LSP](vscode:extension/shopify.ruby-lsp) - Shopify
- [rufo (Ruby formatter)](vscode:extension/mbessey.vscode-rufo) - Matt Bessey

## 💻 Running locally <a name = "running_locally"></a>

Install the dependencies:

```sh
bundle install
```

Run the dev script:

```sh
bin/dev
```

The rails server will be at [http://localhost:3000/](http://localhost:3000/)

## 🧪 Testing <a name = "testing"></a>

To run all tests

```sh
bin/run_tests
```

## API Endpoints <a name = "api-endpoints"></a>

### Search Products

`GET /api/v1/search/:supermarket?q=product_name`

Search for products in a specified supermarket

### URL Parameters

| Parameter     | Type   | Description                                   | Required |
|---------------|--------|-----------------------------------------------|----------|
| `:supermarket`| string | Identifier of the supermarket (e.g., `nw`, `pns`, `wls`) | Yes      |

### Query Parameters

| Parameter | Type   | Description                    | Required |
|-----------|--------|--------------------------------|----------|
| `q`       | string | Product search query (e.g., `"spaghetti"`) | Yes      |

### Responses

- **200 OK**  
  Returns JSON with search results:

  ```json
  {
    "query": "spaghetti",
    "supermarket": "nw",
    "source": "https://www.newworld.co.nz/search?q=spaghetti",
    "results": [
      {
        "supermarket": "nw",
        "id": "5002082",
        "title": "Wattie's Spaghetti In Tomato Sauce",
        "amt": "420g",
        "image": "https://a.fsimg.co.nz/product/retail/fan/image/400x400/5002082.png?w=384",
        "productPageUrl": "/shop/product/5002082_ea_000nw?name=wattie%27s-spaghetti-in-tomato-sauce",
        "price": {
          "value": "2.79",
          "per": "ea",
          "unitPrice": "0.66",
          "unit": "100g"
        },
        "promo": {
          "tag": "",
          "value": "1.99",
          "per": "ea",
          "unitPrice": "0.47",
          "unit": "100g",
          "limit": "Limit 6 assorted"
        }
      }
      // ...more products
    ]
  }


- **400 Bad Request**  
  Missing or invalid parameters:

  ```json
  { "error": "Invalid supermarket source" }
  ```
  or

  ```json
  { "error": "Query parameter is required" }
  ```

- **404 Not Found**  
  Cached results not found for the supermarket

  ```json
  { "error": "Not found" }
  ```

- **500 Internal Server Error**  
  Unexpected error occurred during processing

  ```json
  { "error": "An error occurred while processing the request" }
  ```

**Notes**. 
- Supported supermarkets: nw, pns, wls, test_shop  
- The API scrapes supermarket websites for live data when possible  
- Falls back to cached data if scraping is unavailable or for unsupported supermarkets  
- Cached data is stored in JSON files per supermarket  


## FYI Documents <a name = "fyi_documents"></a>

- [Rails](/backend/_FYI.md)
- [Controllers](/backend/app/controllers/_FYI.md)
- [Layouts](/backend/app/views/layouts/_FYI.md)
- [Pages](/backend/app/views/pages/_FYI.md)
- [Config](/backend/config/_FYI.md)
