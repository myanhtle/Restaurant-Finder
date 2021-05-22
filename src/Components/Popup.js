import React from "react";

export default function Popup({ feature, directions }) {
  const { id, name, description } = feature.properties;

  const handleClick = (e) => {
    directions.setDestination(feature.geometry.coordinates);
  };

  return (
    <div id={`popup-${id}`}>
      <div>
        <b>{name}</b>
      </div>
      <div>{description}</div>
      <button onClick={handleClick}>Get Directions</button>
    </div>
  );
}
