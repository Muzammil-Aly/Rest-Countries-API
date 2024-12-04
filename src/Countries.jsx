import React, { useState, useEffect } from "react";
import "./Countries.css";
import "./index.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const Countries = () => {
  const url = "https://restcountries.com/v3.1/all"; // API URL to fetch countries
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("Europe"); // Store selected region as a string
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Store search term as a string
  const [selectedCountry, setselectedCountry] = useState(""); // Store search term as a string

  // Fetch countries data from API
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  }, []); // Empty dependency array ensures the fetch runs only once when component mounts

  // Get unique regions from the countries data
  const uniqueRegions = [
    ...new Set(countries.map((country) => country.region)),
  ];

  // Filter countries based on the region and search term
  const filteredCountries = countries
    .filter((country) => country.region === region)
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="countries-main-container m-20 w-4  2xl:w-[80vw] h-[100vh] sm:px-20 ">
      <div className=" grid sm:grid-cols-1 gap-4   xl:grid-cols-[1fr,auto] ">
        <div className="search  ">
          <TextField
            variant="outlined"
            placeholder="Search for a country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar "
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="searchicon" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="filter sm : w-[220px] ">
          <div className="filter-button  ">
            <Button
              className="filter-button-01 "
              endIcon={<ArrowDropDownIcon />}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Filter by Region
            </Button>
          </div>
          {isDropdownOpen && (
            <div className="dropdown">
              {uniqueRegions.map((region) => (
                <p
                  key={region}
                  onClick={() => {
                    setRegion(region); // Set the selected region
                    setIsDropdownOpen(false); // Close dropdown on region selection
                  }}
                >
                  {region}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-1 xl:grid-cols-4 gap-10 md:text-xl  ">
        {filteredCountries.map((country) => (
          <div
            className="countries-card md: w-80 lg:w-auto   "
            key={country.cca3}
          >
            <a href="#" onClick={() => setselectedCountry(country)}>
              {console.log(selectedCountry)}
              <Link to={`/country/${country.name.common}`}>
                <img
                  className="countries-card-img"
                  src={country.flags.svg}
                  alt={country.name.common}
                />
                <div className=" countries-data   ">
                  <h2>{country.name.common}</h2>
                  <p>
                    Population:
                    <span className="info"> {country.population} </span>
                  </p>
                  <p>
                    Region:
                    <span className="info"> {country.region} </span>
                  </p>
                  <p>
                    Capital:
                    <span className="info"> {country.capital} </span>
                  </p>
                </div>
              </Link>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
