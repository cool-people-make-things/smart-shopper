# 2. Docker

Date: 2025-07-15

## Status

Accepted

## Context

In order to use web scraping tools that are more complex than a basic query, we need chromium. The web pages we want to use have a delay, checks, and validation that occurs before data is displayed. A full browser like environment is required to wait as a typical browser would, and this is where chromium is needed.

The issue is that while chromium could be installed on separate systems, this would require us to manage the installation and updates of chromium across different OS and on whatever platform we host this. This is not great, and we want to avoid having to manage this ourselves.

## Decision

We will use Docker to containerize our application, including the Chromium install. This will allow us to create a consistent environment for our web scraping regardless of the platform.

By using Docker we can define our dependencies, including chromium, to ensure that we are always using the same setup and ensure selenium has a consistent location to find chromium.

## Consequences

This means we will need a docker-friendly environment to host our app and each of us will need to install Docker on our machines.
