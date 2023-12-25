import React, { Component } from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

// Fonts imported from MutationObserver.com
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FloatingActionButtons from "./components/EditBtn";

import Brewery from "./components/Brewery";
import Edit from "./components/Edit";
import { Card } from "@mui/material";
import MyMapComponent from "./components/Map"

const App = () => {
  const [breweries, setBreweries] = useState([]);
  const [hideBreweries, setHideBreweries] = useState(false);
  const [hideImage, setHideImage] = useState(true);
  const [hideEdit, setHideEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [editingBrewery, setEditingBrewery] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  //-----------------------------------
  //              NEW BREWERY
  //-----------------------------------
  const getBreweries = () => {
    axios.get("https://api.openbrewerydb.org/v1/breweries").then((response) => {
      setBreweries(response.data);
    });
  };
  const handleCreate = (data) => {
    axios.post("http://localhost:3000/breweries", data).then((response) => {
      console.log(response);
      let newBreweries = [...breweries, response.data];
      setBreweries(newBreweries);
    });
  };

  //-----------------------------------
  //              UPDATE BREWERY
  //-----------------------------------

  const handleEdit = (data) => {
    axios
      .put(`http://localhost:3000/breweries/` + data._id, data)
      .then((response) => {
        let newBreweries = breweries.map((brewery) => {
          return brewery._id !== data._id ? brewery : data;
        });
        setBreweries(newBreweries);
      });
  };

  //-----------------------------------
  //          Handle Edit Click
  //-----------------------------------
  const handleEditClick = (brewery) => {
    setEditingBrewery(brewery);
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
  };

  //-----------------------------------
  //          Pagination
  //-----------------------------------
  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function handlePrevPage() {
    setCurrentPage(currentPage - 1);
  }

  useEffect(() => {
    const resultsPerPage = 5;
    const url = `https://api.openbrewerydb.org/v1/breweries?page=${currentPage}&per_page=${resultsPerPage}`;

    axios
      .get(url)
      .then((response) => {
        setBreweries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching breweries:", error);
      });
  }, [currentPage]);

  useEffect(() => {
    const page_number = 1;
    const results_per_page = 10;
    const url = `https://api.openbrewerydb.org/v1/breweries?page=${page_number}&per_page=${results_per_page}`;

    axios
      .get(url)
      .then((response) => {
        setBreweries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching breweries:", error);
      });
  }, []);

  return (
    <div>
      {/* NAV BAR SECTION */}
      <nav id="nav">
        <img id="logo" src="/logo.png" alt="" />
        <ul id="navUl">
          <li id="navItem">
            <a href="#">Home</a>
          </li>
          <li id="navItem">
            <a href="#">About</a>
          </li>
          <li id="navItem">
            {" "}
            <a href="#">Breweries</a>
          </li>
          <li id="navItem">
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <h1>RaYo List of Breweries</h1>
      {/* PAGINATION SECTION */}
      <div className="pagination">
        <Button
          color="success"
          id="nxtBtn"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Previous
        </Button>
        <Button color="success" id="nxtBtn" onClick={handleNextPage}>
          Next
        </Button>
      </div>
      <MyMapComponent />
      <center>
        <div>
          {breweries.map((brewery) => {
            return (
              <>
                {/* CARDS SECTION */}
                <div className="test" key={brewery.id}>
                  <div className="breweryCard">
                    <Brewery brewery={brewery} />
                    <FloatingActionButtons
                      brewery={brewery}
                      onEdit={() => handleEditClick(brewery)}
                    />
                  </div>
                </div>
              </>
            );
          })}
          <Dialog open={isEditDialogOpen} onClose={handleCloseDialog}>
            <DialogContent>
              {editingBrewery && (
                <Edit brewery={editingBrewery} handleEdit={handleEdit} />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </center>
    </div>
  );
};

export default App;
