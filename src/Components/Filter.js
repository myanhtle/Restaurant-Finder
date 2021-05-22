import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Filter({ filter, setFilter }) {
  const handleClick = (e) => {
    console.log(e.target.value);
    setFilter((prevValue) => {
      return { ...filter, [e.target.value]: !prevValue[e.target.value] };
    });
  };

  return (
    <div>
      <DropdownButton
        className="my-3 mr-2 ml-1"
        md="3"
        style={{ top: "4.4vh" }}
        title="Filter"
      >
        <div className="mx-2">
          <div key="inline-checkbox1" className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="bakery"
              id="bakery-checkbox"
              onClick={handleClick}
            />
            <label className="form-check-label" htmlFor="bakery-checkbox">
              Bakery
            </label>
          </div>
          <div key="inline-checkbox2" className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="bar"
              id="bar-checkbox"
              onClick={handleClick}
            />
            <label className="form-check-label" htmlFor="bar-checkbox">
              Bar
            </label>
          </div>
          <div key="inline-checkbox3" className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="cafe"
              id="cafe-checkbox"
              onClick={handleClick}
            />
            <label className="form-check-label" htmlFor="cafe-checkbox">
              Cafe
            </label>
          </div>
          <div key="inline-checkbox4" className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="restaurant"
              id="restaurant-checkbox"
              onClick={handleClick}
            />
            <label className="form-check-label" htmlFor="restaurant-checkbox">
              Restaurant
            </label>
          </div>
          <div key="inline-checkbox5" className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="3-rating"
              id="3star-checkbox"
              onClick={handleClick}
            />
            <label className="form-check-label" htmlFor="3star-checkbox">
              3 Rating
            </label>
          </div>
          <div key="inline-checkbox6" className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="4-rating"
              id="4star-checkbox"
              onClick={handleClick}
            />
            <label className="form-check-label" htmlFor="4star-checkbox">
              4 Rating
            </label>
          </div>
          <div key="inline-checkbox7" className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="5-rating"
              id="5star-checkbox"
              onClick={handleClick}
            />
            <label className="form-check-label" htmlFor="5star-checkbox">
              5 Rating
            </label>
          </div>
          <div key="inline-checkbox8" className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="$"
              id="price-1"
              onClick={handleClick}
            />
            <label className="form-check-label" htmlFor="price-1">
              $
            </label>
          </div>
          <div key="inline-checkbox9" className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="$$"
              id="price-2"
              onClick={handleClick}
            />
            <label className="form-check-label" htmlFor="price-2">
              $$
            </label>
          </div>
          <div key="inline-checkbox10" className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="$$$"
              id="price-3"
              onClick={handleClick}
            />
            <label className="form-check-label" htmlFor="price-3">
              $$$
            </label>
          </div>
        </div>
      </DropdownButton>
    </div>
  );
}
