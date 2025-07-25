# 2. Splitting the front from back

Date: 2025-07-14

## Status

Accepted

## Context

While this project was originally set up with the frontend inside our ruby backend, this is being changed.

While there are rails templates that use vite this proved to be a bit of a pain to set up, specifically once we got Tailwind involved, configuration was difficult and threw a variety of errors as we worked through it. It will be easier to have the frontend and backend in separate folders. Though it was imagined having one system running the frontend and backend together would be useful, it is not worth it.

Now the frontend will be run using `npm` to manage Vite, TS, and React in the `/frontend` folder, and the backend will be run using `rails` in the `/backend` folder.

The git repo originates from the root folder, so both the frontend and backend will still be in the same git repo.

## Decision

From this point, our project will now be organised in this structure:

```
root
  |- backend/
    |- app/
    |- Gemfile
    |- ...
    |- README.md
  |- frontend/
    |- src/
    |- package.json
    |- ...
    |- README.md
  |- doc/
  |- README.md
```

The frontend tech will be extracted to the `/frontend` folder, and the backend in the `/backend` folder. The root of the project will contain a `README.md` file that links to both the frontend and backend readmes.

## Consequences

This makes it easier to work on the frontend and backend separately, allows for more flexibility in how we deploy the two systems, and makes it easier to use tools that are specific to either the frontend or backend separately without having to worry about conflicts or dependency issues between the two.
