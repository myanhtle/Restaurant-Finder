import React, { useState } from "react";

export default function Restaurants({ restaurants }) {
  return (
    <div className="d-flex justify-content-center">
      <div>
        {restaurants.map((r) => (
          <li key={r.place_id}>
            {r.name} {r.rating} {r.price_level}
          </li>
        ))}
      </div>
    </div>
  );
}
