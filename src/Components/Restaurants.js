import React from "react";
import Map from "./Map";

export default function Restaurants({ restaurants, lat, lon }) {
  const featuresList = [];

  const addRestaurant = (list) => {
    list = restaurants.map((r) => {
      if (true) {
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
          },
        };
      } else {
        return;
      }
    });
    return list;
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <Map featuresList={addRestaurant(featuresList)} lat={lat} lon={lon} />
      </div>
    </div>
  );
}
