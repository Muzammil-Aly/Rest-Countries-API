import React, { useState, useEffect } from "react";
import "./Header.css";
import Button from "@mui/material/Button";
import NightlightRoundOutlinedIcon from "@mui/icons-material/NightlightRoundOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const changeTheme = () => {
    const searchBar = document.querySelector(".header");

    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);

    const maincontainer = document.querySelectorAll(
      ".countries-main-container *"
    );
    maincontainer.forEach((elements) => {
      elements.classList.toggle("light-theme");
    });

    const countryDetails = document.querySelectorAll(
      ".country-details-contain *"
    );
    countryDetails.forEach((elements) => {
      elements.classList.toggle("light-theme");
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={`main-header ${
        darkMode ? "dark" : ""
      } flex flex-row justify-between items-center w-[120vw]  xl:w-[82%] xl:mx-40 p-5 px-10 mx-20 mt-2 `}
    >
      <div className="text-xs sm:text-xl  font-semibold   ">
        <h2>Where in the world?</h2>
      </div>
      <div>
        <Button
          onClick={changeTheme}
          startIcon={
            darkMode ? (
              <NightlightOutlinedIcon style={{ color: "black" }} />
            ) : (
              <NightlightRoundOutlinedIcon style={{ color: "white" }} />
            )
          }
          style={{
            color: darkMode ? "#333" : "#fff",
            textTransform: "none",
          }}
        >
          <h4 className="text-xs lg:text-lg">Dark Mode</h4>
        </Button>
      </div>
    </div>
  );
};

export default Header;
