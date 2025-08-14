# 10. Search Results Storage

Date: 2025-08-05

## Status

Accepted

## Context

We currently have three data objects coming back on the search form submission, one for each supermarket. These objects contain the search results and are then to be distributed to the relevant components for rendering. There are two main ways of managing these search results: either letting the Browse component manage the state, or using a context provider to manage the state. There are reasons and complexities that come with either option, and as this is a small app neither is dramatically better than the other.

## Decision

We will store the search results in a context provider. This allows us to manage the search results in a single place and makes it easier to access them from any component that needs them. The context will provide the search results and any necessary functions to update them making it a one stop shop for search results.

## Consequences

Any edits to the search results will be easier to manage, as they will be centralized in the context. This also allows for better performance, as components can subscribe to the context and only re-render when the search results change. Additionally, it simplifies the component structure, as we can avoid prop drilling and pass down only the necessary data to child components. This approach also makes it easier to implement features like pagination or filtering in the future.

In general though, the best consequence is an opportunity to use and practice more contexts.
