<h3 align="center">Controllers FYI</h3>

- [~ /Backend/README.md](/backend/README.md)  
  - [All FYI document links](/backend/README.md#fyi-documents)
- [~ Project /README.md](/README.md)

## app/views/layouts/ <a name = "app_views_layouts"></a>

The HTML templates that wrap our pages.

If you look in `application.html.erb` it is mostly our head tag. The head contains the script shortcut that calls our frontend entry file:

```erb
<%= vite_javascript_tag 'application.tsx' %>
```

Then for the body:

```erb
  <body>
    <%= yield %>
  </body>
```

This is where the react page will appear.
