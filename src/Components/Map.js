import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Popup from "./Popup";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function Map({ filter, featuresList, lat, lon }) {
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
      profile: "mapbox/driving",
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(directions, "top-left");

    map.on("load", () => {
      directions.setOrigin([lon, lat]);
      directions.interactive(false);
      map.addSource("random-points-data", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: featuresList,
        },
      });

      map.loadImage(
        "https://img.icons8.com/plasticine/2x/marker.png",
        function (error, image) {
          if (error) throw error;

          map.addImage("marker", image);
        }
      );

      map.addLayer({
        id: "random-points-layer",
        source: "random-points-data",
        type: "symbol",
        layout: {
          "icon-image": "marker",
          "icon-size": 0.15,
          "icon-padding": 0,
          "icon-allow-overlap": true,
        },
      });
    });

    map.on("mouseenter", "random-points-layer", (e) => {
      if (e.features.length) {
        const feature = e.features[0];
        const popupNode = document.createElement("div");
        ReactDOM.render(
          <Popup feature={feature} directions={directions} />,
          popupNode
        );
        popUpRef.current
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(popupNode)
          .addTo(map);
      }
    });

    console.log(featuresList, lat, lon);
    return () => map.remove();
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sidebar bg-secondary text-light h-100">
        <div className="heading">
          <h2>Search results...</h2>
        </div>
        <div id="listings" className="listings d-flex flex-column p-1">
          {featuresList.map((r) => (
            <div className="item p-1" key={r.properties.id}>
              <b className="text-dark">{r.properties.name}</b>
              <li>{r.properties.description}</li>
            </div>
          ))}
        </div>
      </div>
      <div id="map" className="map-container" ref={mapContainerRef}></div>
    </div>
  );
}
