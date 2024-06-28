import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
//import './ButtonDelete.css';

const ButtonDelete = ({ filmChecked, filmSearch, setHandleDelete }) => {
  // const [deletedRow,setDeletedRow] = useState()
  const deleteShow = () => {
    const newFilmList = filmSearch.filter(
      (item) => item.filmId !== filmChecked.id + 1
    );
    console.log(newFilmList);
    //setDeletedRow(newFilmList);
    //console.log(deletedRow);
    // console.log(filmChecked.id+1)
    // console.log("Film Search:", filmSearch);
    setHandleDelete(newFilmList);
  };

  return (
    <div className="Button">
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          
          startIcon={<DeleteIcon />}
          onClick={deleteShow}
          style={{
            marginLeft: "8px",
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "red",
            color: "white",
            marginTop:"10px",
            borderColor:"black",
            borderWidth:"2px"
          }}
        >
          Delete
        </Button>
      </Stack>
    </div>
  );
};

export default ButtonDelete;
