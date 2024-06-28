import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./SearchBar.css";

const SearchBar = ({ searchData }) => {
  const [filmD, setFilmD] = useState("");

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setFilmD(newValue);
    searchData(newValue);  // Call searchData function on input change
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-required"
        value={filmD}
        onChange={handleInputChange}
      />
      <div className="Button">
        <button
          type="submit"
          style={{
            marginLeft: "8px",
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "lightgreen",
          }}
        >
          Search
        </button>
      </div>
    </Box>
  );
};

export default SearchBar;
