import React, { useEffect, useState } from "react";
import "./App.css";
import Restaurants from "./Components/Restaurants";
import Search from "./Components/Search";
const API_KEY = process.env.REACT_APP_key;

function App() {
  const [restaurants, setRestaurants] = useState(null);
  const [lat, setLat] = useState(38.0356);
  const [lon, setLon] = useState(-78.5034);

  useEffect(() => {
    fetchRestaurants();
  }, []);

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
        <Search />
      </div>
      <div>
        {restaurants !== null ? (
          <Restaurants restaurants={restaurants} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
