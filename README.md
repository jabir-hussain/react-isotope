# react-isotope

> react-isotope can hide and show item elements with the filter option. Items that match that filter will be shown. Items that do not match will be hidden.

[![NPM](https://img.shields.io/npm/v/react-isotope.svg)](https://www.npmjs.com/package/react-isotope) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-isotope
```

## Usage

As this library expose one component with name "IsotopeGrid", as name suggests that this component also provides generating gridlayout without tears and applying filtering to the grid items with eye catching animation of items hide/show and re-arrage the position.

For the interactive demo please visite [codesandbox](https://codesandbox.io/embed/react-isotope-8imre?fontsize=14&hidenavigation=1&theme=dark);

So we can learn the usage of `react-isotope` by a simple example step by step.

1. Filters `all`, `test`, `test1`, `chart` and `tile`
2. Gridlayout with 7 cards `a`, `b` and etc...

### Filters List

```json
export [
  { "label": "all", "isChecked": true },
  { "label": "test", "isChecked": false },
  { "label": "test1", "isChecked": false },
  { "label": "chart", "isChecked": false },
  { "label": "tile", "isChecked": false }
];
```

### Cards List for layout

```json
export [
  {
    "id": "a",
    "row": 0,
    "col": 0,
    "w": 1,
    "h": 1,
    "filter": ["test", "chart"]
  },
  {
    "id": "b",
    "row": 0,
    "col": 1,
    "w": 1,
    "h": 1,
    "filter": ["test1", "tile"]
  },
  {
    "id": "c",
    "row": 0,
    "col": 3,
    "w": 1,
    "h": 1,
    "filter": ["test", "chart"]
  },
  {
    "id": "d",
    "row": 1,
    "col": 0,
    "w": 1,
    "h": 1,
    "filter": ["test1", "tile"]
  },
  {
    "id": "e",
    "row": 1,
    "col": 1,
    "w": 1,
    "h": 1,
    "filter": ["test", "tile"]
  },
  {
    "id": "f",
    "row": 1,
    "col": 2,
    "w": 1,
    "h": 1,
    "filter": ["test1", "chart"]
  },
  {
    "id": "h",
    "row": 2,
    "col": 0,
    "w": 1,
    "h": 1,
    "filter": ["test1", "chart"]
  }
];

```

### Finally the complete example

```tsx
import React, { useState } from "react";

import IsoTopeGrid from "react-isotope";

import cardsLayout from "./cardsLayout.json";
import filters from "./filters.json";

export default function App() {
  // Local state for managing filtering logic
  const [filters, updateFilters] = useState(filtersDefault);

  // Filter change handler
  const onFilter = event => {
    const {
      target: { value, checked }
    } = event;

    updateFilters(state =>
      state.map(f => {
        if (f.label === value) {
          return {
            ...f,
            isChecked: checked
          };
        }

        return f;
      })
    );
  };

  return (
    <div className="App">
      {// Filter component }
      <div className="filter-container">
        {filters.map(f => (
          <div className="filter" key={`${f.label}_key`}>
            <input
              id={f.label}
              type="checkbox"
              value={f.label}
              onChange={onFilter}
              checked={f.isChecked}
            />
            <label htmlFor={f.label}>{f.label}</label>
          </div>
        ))}
      </div>

      <div className="container">
        <IsoTopeGrid
          gridLayout={cardsLayout} // gridlayout of cards
          noOfCols={3} // number of columns show in one row
          unitWidth={200} // card width of 1 unit
          unitHeight={100} // card height of 1 unit
          filters={filters} // list of selected filters
        >
          {cardsLayout.map(card => (
            <div key={card.id} className={card.filter[0]}>
              {card.id}
            </div>
          ))}
        </IsoTopeGrid>
      </div>
    </div>
  );
}
```

## License

MIT © [jabirhussainturi](https://github.com/jabirhussainturi)
