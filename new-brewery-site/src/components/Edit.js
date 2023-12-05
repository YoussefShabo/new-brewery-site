import React from "react";
import { useState } from "react";
import axios from "axios";

const Edit = (props) => {
  const [brewery, setBrewery] = useState({ ...props.brewery });
  const [breweries, setBreweries] = useState([]);

  const handleChange = (event) => {
    setBrewery({ ...brewery, [event.target.name]: event.target.value });
  };

  //-----------------------------------
  //              DELETE BREWERY
  //-----------------------------------

  const handleDelete = (deletedBrewery) => {
    axios
      .delete("http://localhost:3000/breweries/" + deletedBrewery._id)
      .then((response) => {
        let newBreweries = breweries.filter((brewery) => {
          return brewery._id !== deletedBrewery._id;
        });
        setBreweries(newBreweries);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleEdit(brewery);
  };

  return (
    <>
      <details>
        <summary id="editBtn">Edit</summary>
        <form id="editForm" onSubmit={handleSubmit}>
          <div id="formField">
            <label id="line" htmlFor="name">
              <h5>Name:</h5>
            </label>
            <input
              id="input"
              type="text"
              name="name"
              placeholder={props.brewery.name}
              onChange={handleChange}
              value={brewery.name}
            />
          </div>
          <div id="formField">
            <label id="line" htmlFor="name">
              <h5>Type:</h5>
            </label>
            <input
              id="input"
              type="text"
              name="brewery_type"
              placeholder={props.brewery.brewery_type}
              onChange={handleChange}
              value={brewery.brewery_type}
            />
          </div>
          <div id="formField">
            <label id="line" htmlFor="name">
              <h5>Street:</h5>
            </label>
            <input
              id="input"
              type="text"
              name="street"
              placeholder={props.brewery.street}
              onChange={handleChange}
              value={brewery.street}
            />
          </div>
          <div id="formField">
            <label id="line" htmlFor="name">
              <h5>City:</h5>
            </label>
            <input
              id="input"
              type="text"
              name="city"
              placeholder={props.brewery.city}
              onChange={handleChange}
              value={brewery.city}
            />
          </div>
          <div id="formField">
            <label id="line" htmlFor="name">
              <h5>State:</h5>
            </label>
            <input
              id="input"
              type="text"
              name="state"
              placeholder={props.brewery.state}
              onChange={handleChange}
              value={brewery.state}
            />
          </div>
          <div id="formField">
            <label id="line" htmlFor="name">
              <h5>Country:</h5>
            </label>
            <input
              id="input"
              type="text"
              name="country"
              placeholder={props.brewery.country}
              onChange={handleChange}
              value={brewery.country}
            />
          </div>
          <div id="formField">
            <label id="line" htmlFor="name">
              <h5>Web:</h5>
            </label>
            <input
              id="input"
              type="url"
              name="website_url"
              placeholder={props.brewery.website_url}
              onChange={handleChange}
              value={brewery.website_url}
            />
          </div>
          <div id="editButtons">
            <input id="editBtn" type="submit" />
            <button
              id="editBtn"
              onClick={() => {
                handleDelete(brewery);
              }}
            >
              Remove
            </button>
          </div>
        </form>
      </details>
    </>
  );
};

export default Edit;
