import React, { useState } from "react";

import IsoTopeGrid, { Card } from "react-isotope";

import "./index.css";

const cardsDefault = [
  {
    id: "a",
    filter: ["test", "chart"]
  },
  {
    id: "b",
    filter: ["test1", "tile"]
  },
  {
    id: "c",
    filter: ["test", "chart"]
  },
  {
    id: "d",
    filter: ["test1", "tile"]
  },
  {
    id: "e",
    filter: ["test", "tile"]
  },
  {
    id: "f",
    filter: ["test1", "chart"]
  },
  {
    id: "h",
    filter: ["test1", "chart"]
  }
];

const filtersDefault = [
  { label: "all", isChecked: true },
  { label: "test", isChecked: false },
  { label: "test1", isChecked: false },
  { label: "chart", isChecked: false },
  { label: "tile", isChecked: false }
];

export default function App() {
  const [filters, updateFilters] = useState(filtersDefault);

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
          gridLayout={cardsDefault}
          noOfCols={4}
          unitWidth={200}
          unitHeight={100}
          filters={filters}
        >
          {cardsDefault.map(card => (
            <div key={card.id} className={card.filter[0]}>
              {card.id}
            </div>
          ))}
        </IsoTopeGrid>
      </div>
    </div>
  );
}
