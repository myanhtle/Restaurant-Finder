import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Popup from "./Popup";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function Map({ featuresList, lat, lon }) {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lon, lat],
      zoom: 15,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(directions, "top-left");

    map.on("load", () => {
      map.addSource("random-points-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: featuresList,
        },
      });

      map.addLayer(
        {
          id: "random-points-layer",
          source: "random-points-data",
          type: "symbol",
          layout: {
            "icon-image": "fast-food-15",
            "icon-padding": 0,
            "icon-allow-overlap": true,
          },
        },
        directions.setOrigin([lon, lat])
      );
    });

    map.on("click", "random-points-layer", (e) => {
      if (e.features.length) {
        const feature = e.features[0];
        const popupNode = document.createElement("div");
        ReactDOM.render(<Popup feature={feature} />, popupNode);
        popUpRef.current
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(popupNode)
          .addTo(map);
        const end = feature.geometry.coordinates;
      }
    });

    console.log(featuresList, lat, lon);
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
}
