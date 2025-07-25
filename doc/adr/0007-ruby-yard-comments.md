# 7. ruby yard comments

Date: 2025-07-22

## Status

Accepted

## Context

After refactoring our scraper components and adding more error handling and the like, the code is harder to read and so to improve it's readability we want to add comment descriptions of the methods to our code.

After looking for a standard to do this (similar to JSDoc), we found Ruby's YARD documentation, which allows us to write structured comments for our methods in a regular fashion. There does also seem to tools that use this format to generate documentation from our code, but we are not looking to do that at the mo.

## Decision

We will use YARD comments to document our Ruby methods, though as we are not using YARD tooling, we will just the style and can adapt it to our own needs.

This will include:

- a brief description of the method
- `@param` to describe the parameters of the method, including their types and descriptions
- `@return` to describe the return value of the method
- `@raise` to describe the exception raised (if this is the core functionality of the method)
- `@example` to provide an example of how to use the method (if it is not obvious)

Notes:

- If a pre-defined frontend type is returned, the type will be used instead of the raw Hash structure
- If a Hash object is returned, the keys will be documented
- If an array is returned, the type of the items in the array will be documented

## Consequences

This will help the back end to be readable, though as we are not using YARD tooling it will not generate documentation for us. We will need to ensure that the comments are kept up to date manually. It will help us to understand the code better as we write it, and will be useful for others looking at the project.

To help keep the comments consistent, we will add a document in the `doc/` folder that describes how to write these comments for us to use as a guide when writing our own comments.
