# app/views/layouts/

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
