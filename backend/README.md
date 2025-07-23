<h3 align="center">Smart Shopper - Backend</h3>

### 📝 Table of Contents

- [Getting Started](#getting_started)
  - [Prerequisites](#prerequisites)
    - [Ruby in WSL](#ruby_in_wsl)
    - [Rails](#rails)
    - [VS Code](#vs_code)
- [Running Locally](#running_locally)
- [Testing](#testing)

[~ Project /README.md](/README.md)

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites <a name = "prerequisites"></a>

Check if Ruby, Gem, and Rails are available already:

```sh
ruby -v && gem -v && rails -v
```

Before running following commands, make sure you have the correct ruby version. You can check in [tool-versions](../.tool-versions).

If you don't, follow the below steps to install

- [Install Ruby and Rails](../docs/readme/Install-ruby-rails.md)

If you do have them installed, then;

Install the dependencies

```sh
bundle install
```

## 💻 Running locally <a name = "running_locally"></a>

To start the rails server on port 3000 we'll be using a dev script that includes Docker Compose (check the [Getting Started](./_GettingStarted.md) doc for install tips).

To run the dev script:

```sh
bin/dev
```

or

```sh
bin/dev
```

The rails server will be at [http://localhost:3000/](http://localhost:3000/) in the browser

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
