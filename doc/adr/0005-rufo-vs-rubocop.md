# 5. Rufo vs RuboCop

Date: 2025-07-16

## Status

Accepted

## Context

As we add more code to our project, we need to ensure that our code style remains consistent. We have two options for formatting Ruby code: Rufo and RuboCop.

We need a lightweight setup that can format our Ruby code without requiring a lot of config. And as we are new to Ruby, we want something that is easy to use and understand.

While investigating formatters, RuboCop was a popular choice, but it turned out to be quite heavy-handed for our needs. RuboCop has a lot of opinions and rules, which can be overwhelming for us newbies.

On the other hand, Rufo is a simpler formatter that focuses on formatting code without enforcing strict rules. It is lightweight and easy to use, making it a better fit for our project.

## Decision

We will use Rufo as our Ruby code formatter. This will allow us to focus on writing code without worrying about formatting issues or inconsistencies between us as we're getting started with Ruby.

## Consequences

We will need to install Rufo in our project and a VSCode extension to run automatically on save in our editor.
