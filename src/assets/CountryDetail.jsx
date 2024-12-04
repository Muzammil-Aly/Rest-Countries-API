import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CountryDetail.css";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
const CountryDetail = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [borderCountries, setBorderCountries] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch all countries data
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setAllCountries(data);

        // Fetch the selected country's details
        const selectedCountry = data.find(
          (c) => c.name.common.toLowerCase() === countryName.toLowerCase()
        );
        setCountry(selectedCountry);

        // Find the border countries
        if (selectedCountry?.borders) {
          const borders = selectedCountry.borders.map((borderCode) =>
            data.find((c) => c.cca3 === borderCode)
          );
          setBorderCountries(borders);
        }
      });
  }, [countryName]);
  const getNativeName = (country) => {
    if (country?.name?.nativeName) {
      // Get the first native name's common value
      const nativeNames = Object.values(country.name.nativeName);
      return nativeNames[0]?.common || "N/A"; // Fallback to "N/A" if not found
    }
    return "N/A"; // Return "N/A" if nativeName is not available
  };

  const getLanguages = (country) => {
    if (country?.languages) {
      // Get the first native name's common value
      const languagess = Object.values(country.languages).join(", ");

      return languagess || "N/A"; // Fallback to "N/A" if not found
    }
    return "N/A"; // Return "N/A" if nativeName is not available
  };

  const getCurrencies = (country) => {
    if (country?.currencies) {
      // Get the first native name's common value
      const Currencies = Object.values(country.currencies);

      return Currencies[0]?.name || "N/A"; // Fallback to "N/A" if not found
    }
    return "N/A"; // Return "N/A" if nativeName is not available
  };
  return (
    <div className="country-details-contain   lg:ml-12  ">
      <div className="back-button ">
        <Button
          className="back-buttn "
          sx={{
            backgroundColor: "#fff",
            color: "black",
            fontSize: "15px",
            margin: "5px",
            gap: "5px",
            padding: "5px 30px",
            ":hover": {
              backgroundColor: "hsl(209, 33%, 32%)",
            },
          }}
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </div>
      {country ? (
        <div
          className=" flex flex-col px-28 gap-4 min-w-[150vw] sm:min-w-[10vw]   sm:flex-row sm:gap-44   sm:px-24  
          "
        >
          <div className=" sm:ml-32 lg:ml-0 ">
            <img src={country.flags.svg} alt={country.name.common} />
          </div>
          <div className="country-details  sm:mx-40 lg:mx-0 ">
            <h1 className=" text-2xl my-10 md:text-4xl  ">
              {country.name.common}
            </h1>
            <div className="  flex flex-col gap-10 sm:flex-row sm:gap-28  ">
              <div>
                <p className="country-paragraph">
                  Native Name:
                  <span className="country-paragraph-detail">
                    {getNativeName(country)}
                  </span>
                </p>
                <p className="country-paragraph">
                  Population:
                  <span className="country-paragraph-detail">
                    {country.population.toLocaleString("en-US")}
                  </span>
                </p>
                <p className="country-paragraph">
                  Region:{" "}
                  <span className="country-paragraph-detail">
                    {country.region}
                  </span>
                </p>
                <p className="country-paragraph">
                  Subregion:{" "}
                  <span className="country-paragraph-detail">
                    {country.subregion}
                  </span>
                </p>
                <p className="country-paragraph">
                  Capital:{" "}
                  <span className="country-paragraph-detail">
                    {country.capital}
                  </span>
                </p>
              </div>
              <div>
                <p className="country-paragraph">
                  Top Level Domain:
                  <span className="country-paragraph-detail">
                    {country.tld}
                  </span>
                </p>

                <p className="country-paragraph">
                  Currencies:
                  <span className="country-paragraph-detail">
                    {getCurrencies(country)}
                    {/* {getLanguages(country)} */}
                  </span>
                </p>

                <p className="country-paragraph">
                  Languages:
                  <span className="country-paragraph-detail">
                    {getLanguages(country)}
                  </span>
                </p>
              </div>
            </div>
            <div className=" flex flex-row gap-5 mt-10  ">
              <p>Border Countries:</p>
              <div className="flex flex-row">
                {borderCountries.length > 0 ? (
                  borderCountries.map((border, index) => (
                    <Button className="border-buttons " key={index} style={{}}>
                      {border?.name?.common || "Unknown"}
                    </Button>
                  ))
                ) : (
                  <p>No border countries</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CountryDetail;
