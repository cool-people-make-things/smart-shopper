# 11. Cart Format

Date: 2025-08-12

## Status

Accepted

## Context

Currently the Cart is stored in the format:

```js
{
  nw: [
    { id: 'MD321', quantity: 5, product { id: 'MD321', ... } }
  ],
  pns: [],
  wls: [],
}
```

Each array holds products from the respective supermarket when added to the cart.

This is fine for adding things to the cart, but makes the code messy when updating the cart items. There are also considerations around re-renders and performance, though the data will be small.

## Decision

The data will be stored in objects to enable simple referencing of the products in the cart. The new format will be:

```js
{
  nw: {
    'MD321': { quantity: 5, product: { id: 'MD321', ... } }
  },
  pns: {},
  wls: {},
}
```

## Consequences

This will make it easier to update the cart items, as we can directly reference the product by its ID. It also maintains the simplicity of the code for rendering the cart items, as we can easily access the object values or entries as needed with Object operations.

Even though the cart data will be small, it is nice to know we no longer need to loop through arrays to find and update items, dropping complexity for updates and deletes from O(n) to O(1). Again, not a significant difference, but a nice improvement nonetheless and the code will be cleaner and more maintainable.
