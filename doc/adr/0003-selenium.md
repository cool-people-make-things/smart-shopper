# 3. Selenium

Date: 2025-07-14

## Status

Accepted

## Context

There's a variety of tools that can be used to scrape data from the web, but many of them require a full browser environment to function correctly. We had hoped to use a tool like `httparty` to scrape data, something that issues simple requests without browser tools, but this proved to be insufficient for the sites involved.

The sites we want to scrape have a delay, checks, and validation that occurs before data is displayed. A full browser-like environment is required to wait as a typical browser would.

## Decision

We will be using Selenium to scrape data. Selenium is a tool that allows us to control a web browser programmatically like Puppeteer does, and it integrates well with Ruby, making it ideal for our purposes.

We chose not to use Puppeteer because it is primarily a Node.js library, and we wanted to keep our stack consistent with Ruby on Rails.

## Consequences

Chromium will be needed, this means we will need to work out how to install and manage the browser across our different OS setups.
