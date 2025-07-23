<h3 align="center">Controllers FYI</h3>

- [~ /Backend/README.md](/backend/README.md)
  - [All FYI document links](/backend/README.md#fyi-documents)
- [~ Project /README.md](/README.md)

## config/ <a name = "config"></a>

The master config for this app.

I haven't touched most of this stuff, but there are two files with custom config:

**routes.rb** - says if we go to `/`, go to the pages controller.

```sh
  root "pages#home"
```
