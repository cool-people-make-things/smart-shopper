# 8. Search Query Location

Date: 2025-07-31'

## Status

Accepted

## Context

Do we want to hide the search query from the user or keep it somewhere they can see?

Big point - without storing search queries in the URL, search queries are only held in the React state, which means that if a user refreshes the page or shares the URL, the search query is lost.

## Decision

Rather than just holding the search query in react, we will store it in the URL on the browser. This allows users to bookmark search results and share them with others, etc.

## Consequences

This means search query management will be easier, as the search state will be preserved across page refreshes and can be easily shared via URL.
