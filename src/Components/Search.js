import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SearchBar() {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setAddress(e.target.value);
    console.log(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(address);
  };

  return (
    <div className="d-flex justify-content-center">
      <Form className="d-flex flex-row" onSubmit={handleSubmit}>
        <Form.Group className="my-3 mr-1" md="6">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="1826 University Ave"
            onChange={handleChange}
            id="streetInput"
            required
          />
        </Form.Group>
        <Form.Group className="my-3 mr-1" md="6">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="Charlottesville" required />
        </Form.Group>
        <Form.Group className="my-3 mr-1" md="3">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="VA" required />
        </Form.Group>
        <Form.Group className="my-3 mr-1" md="3">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="22904" required />
        </Form.Group>
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
