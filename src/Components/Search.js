import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Filter from "./Filter";
const API_KEY = process.env.REACT_APP_key;

export default function SearchBar({ filter, setFilter, setLat, setLon }) {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCoordinates();
  };

  const fetchCoordinates = async () => {
    console.log(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address.street.replaceAll(
        " ",
        "+"
      )},+${address.city.replaceAll(" ", "+")},+${address.state}+${
        address.zip
      }&key=${API_KEY}`
    );
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address.street.replaceAll(
        " ",
        "+"
      )},+${address.city.replaceAll(" ", "+")},+${address.state}+${
        address.zip
      }&key=${API_KEY}`
    )
      .then((resp) => {
        return resp.json();
      })
      .then((obj) => {
        if (obj.status === "OK") {
          setLon(obj.results[0].geometry.location.lng);
          setLat(obj.results[0].geometry.location.lat);
        }
        console.log(obj.results);
      });
  };

  return (
    <div className="d-flex justify-content-center bg-dark">
      <Form className="d-flex flex-row text-light" onSubmit={handleSubmit}>
        <Form.Group className="my-3 mr-1" md="6">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="1826 University Ave"
            onChange={handleChange}
            id="street"
            required
          />
        </Form.Group>
        <Form.Group className="my-3 mr-1" md="6">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Charlottesville"
            onChange={handleChange}
            id="city"
            required
          />
        </Form.Group>
        <Form.Group className="my-3 mr-1" md="3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="VA"
            onChange={handleChange}
            id="state"
            required
          />
        </Form.Group>
        <Form.Group className="my-3 mr-1" md="3">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            placeholder="22904"
            onChange={handleChange}
            id="zip"
            required
          />
        </Form.Group>
        <Filter filter={filter} setFilter={setFilter} />
        <Button
          className="h-40 align-self-center"
          type="submit"
          style={{ marginTop: "31px" }}
        >
          Search
        </Button>
      </Form>
    </div>
  );
}
