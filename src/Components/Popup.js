import React from "react";
import Button from "react-bootstrap/Button";

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
      <div>
        <Button variant="link" size="sm" onClick={handleClick}>
          Get Directions
        </Button>
      </div>
    </div>
  );
}
