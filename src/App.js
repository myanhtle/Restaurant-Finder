import React, { useEffect, useState } from "react";
import "./App.css";
import Restaurants from "./Components/Restaurants";
import Search from "./Components/Search";
const API_KEY = process.env.REACT_APP_key;

function App() {
  const [restaurants, setRestaurants] = useState(null);
  const [filter, setFilter] = useState({
    bakery: false,
    bar: false,
    cafe: false,
    restaurant: false,
    "3-rating": false,
    "4-rating": false,
    "5-rating": false,
    $: false,
    $$: false,
    $$$: false,
  });
  const [lat, setLat] = useState(38.0356);
  const [lon, setLon] = useState(-78.5034);

  useEffect(() => {
    fetchRestaurants();
  }, [lat, lon]);

  const fetchRestaurants = () => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&rankby=distance&type=restaurant&key=${API_KEY}`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        console.log(obj);
        if (obj.status === "OK") {
          setRestaurants(obj.results);
        } else {
          setRestaurants(null);
        }
      });
  };

  return (
    <div className="App">
      <div>
        <Search
          filter={filter}
          setFilter={setFilter}
          setLat={setLat}
          setLon={setLon}
        />
      </div>
      <div>
        {restaurants !== null ? (
          <Restaurants
            filter={filter}
            restaurants={restaurants}
            lat={lat}
            lon={lon}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
