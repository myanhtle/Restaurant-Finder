import React from "react";

export default function Popup({ feature }) {
  const { id, name, description } = feature.properties;

  return (
    <div id={`popup-${id}`}>
      <div>
        <b>{name}</b>
      </div>
      <div>{description}</div>
    </div>
  );
}
