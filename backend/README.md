<h3 align="center">Smart Shopper - Backend</h3>

### 📝 Table of Contents

- [Getting Started](#getting_started)
  - [Prerequisites](#prerequisites)
    - [Ruby, Rails, and Docker](#ruby_rails_docker)
    - [VSCode Extensions](#vscode_extensions)
- [Running Locally](#running_locally)
- [Testing](#testing)

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

- [Install Ruby and Rails](../docs/readme/Install-ruby-rails.md)
- [Install Docker and Docker-Compose](../docs/readme/Install-docker.md)

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

## FYI Documents <a name = "fyi_documents"></a>

- [Rails](/backend/_FYI.md)
- [Controllers](/backend/app/controllers/_FYI.md)
- [Layouts](/backend/app/views/layouts/_FYI.md)
- [Pages](/backend/app/views/pages/_FYI.md)
- [Config](/backend/config/_FYI.md)
