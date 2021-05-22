import React from "react";
import Map from "./Map";

export default function Restaurants({ filter, restaurants, lat, lon }) {
  const featuresList = [];

  const addRestaurant = (list) => {
    const foodFilters = [];
    const rateFilters = [];
    const priceFilters = [];
    Object.keys(filter).forEach((key) => {
      if (
        filter[key] &&
        !["3-rating", "4-rating", "5-rating", "$", "$$", "$$$"].includes(key)
      ) {
        foodFilters.push(key);
      } else if (
        filter[key] &&
        ["3-rating", "4-rating", "5-rating"].includes(key)
      ) {
        const rating = key.slice(0, 1);
        rateFilters.push(parseInt(rating));
      } else if (filter[key] && ["$", "$$", "$$$"].includes(key)) {
        priceFilters.push(key.length);
      }
    });

    list = restaurants
      .filter((r) => r.hasOwnProperty("opening_hours"))
      .filter((r) => r.opening_hours.open_now)
      .filter((r) =>
        r.types.some((t) =>
          foodFilters.length !== 0 ? foodFilters.includes(t) : true
        )
      )
      .filter((r) =>
        rateFilters.length !== 0 ? r.rating >= rateFilters[0] : true
      )
      .filter((r) =>
        priceFilters.length !== 0 ? r.price_level === priceFilters[0] : true
      )
      .map((r) => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [r.geometry.location.lng, r.geometry.location.lat],
          },
          properties: {
            id: r.place_id,
            name: r.name,
            description: `Rating: ${r.rating}, Price Level: ${r.price_level}`,
            types: r.types,
          },
        };
      });
    return list;
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <Map
          filter={filter}
          featuresList={addRestaurant(featuresList)}
          lat={lat}
          lon={lon}
        />
      </div>
    </div>
  );
}
