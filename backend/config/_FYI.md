# config/

The master config for this app.

I haven't touched most of this stuff, but there are two files with custom config:

**routes.rb** - says if we go to `/`, go to the pages controller.

```sh
  root "pages#home"
```

**vite.json** - tells vite where to look for our js stuff

```sh
  "sourceCodeDir": "app/frontend",
```
