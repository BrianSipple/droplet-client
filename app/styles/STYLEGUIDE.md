# CSS Style Guide

## Prefixes

- `c` (Components)
  - Concrete implementations of object-like patterns that may be designed to have rules unique to different contexts. For example, `c-button`, `.c-button--lg`, `.c-button--raised`, `.c-button--flat`, etc.
  - **Changes under these selectors should not cause application-wide side-effects**


- `o` (Objects)
  - Signifies that something is an Object, and that it may be used in any number of unrelated contexts to the one you can currently see it in. Modifications to these types of class could potentially have knock-on effects in a lot of other unrelated places. Tread carefully.


- `u` (Utilities)
  - Signifies that this class is a Utility class. It has a very specific role (often providing only one declaration) and should not be bound onto or changed. It can be reused and is not tied to any specific piece of UI.


- `g` (Garnishes)
  - Similar to utilities, but focused on outer- or ‘skin’-level styles as opposed to structural/layout styles. Examples include colors and font settings.

- `p` (Pages)
  - Rules for page-level concerns


- `lf`: Special styling for Liquid-Fire concerns
