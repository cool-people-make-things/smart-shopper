<h3 align="center">Rails FYI</h3>

[~ /Backend/README.md](/backend/README.md)  
[~ Project /README.md](/README.md)

## The rundown

Rails requires a more structured approach to it's directories as a lot of the names are predifined for various tasks. As their official site says:

> Rails promotes "convention over configuration"

Most of what we will touch is in `/app`. I've added a few more `_FYI.md` files in important directories to help us keep it straight while we get started.

[All FYI document links](/backend/README.md#fyi-documents)

The general flow of our app is:

```
→ Request
  → Controller
    → View (returning HTML)

<!-- OR -->

→ Request
  → Controller
    → Data processing file (returning JSON)
```

To be specific, for a request such as `GET /`

```
→ GET / request is made
  → root (/) request goes to pages#home controller

→ PagesController renders 2 things:
  → HTML template views/layouts/application.html.erb
  → Home HTML from views/pages/home.html.erb

→ HTML loads
  → Body now contains <div id="root">
  → Head says to Vite, gimme that application.tsx
  → React loaded into root div
  → We all clap
```
