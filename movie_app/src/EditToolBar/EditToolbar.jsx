import axios from "axios";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { GridToolbarContainer } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Close as CloseIcon } from "@mui/icons-material";
import { Snackbar, SnackbarContent, IconButton } from "@mui/material";

function EditToolbar({
  setRows,
  setRowModesModel,
  handleAddModal,
  fetchAllFilms,
}) {
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    filmId: "",
    title: "",
    description: "",
    releaseyear: "",
    length: "",
    languageId: "", // New field for language ID
  });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  const handleAddRecord = () => {
    async function fetchAddData() {
      const apiUrl = "http://localhost:8081/add";
      try {
        const response = await axios.post(apiUrl, newRecord, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        fetchAllFilms();

        if (response.status === 201) {
          console.log("API working on URL:", apiUrl);
          console.log("Payload:", response.data);
          showSnackbar("Film added successfully")
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (err) {
        console.error("Error fetching film data:", err);
      }
    }

    fetchAddData();

    handleAddModal(newRecord); // Call the function passed from FilmGrid
    handleClose();
  };

  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: "#768dcc", // Primary color
          color: "white",
          "&:hover": {
            backgroundColor: "#1565c0", // Darken the color a bit on hover
          },
        }}
        onClick={handleOpen}
      >
        Add 
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Add New Record</h2>
          {/* <TextField
            fullWidth
            margin="normal"
            label="Film ID"
            name="filmId"
            value={newRecord.filmId}
            onChange={handleInputChange}
          /> */}
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={newRecord.title}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={newRecord.description}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            input
            type="int"
            margin="normal"
            label="Release Year"
            name="releaseyear"
            value={newRecord.releaseyear}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            input
            type="number"
            margin="normal"
            label="Length"
            name="length"
            value={newRecord.length}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            type="number"
            margin="normal"
            label="Language ID"
            name="languageId"
            value={newRecord.languageId}
            onChange={handleInputChange}
          />
          <Button color="primary" variant="contained" onClick={handleAddRecord}>
            Add
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="#19fc4e" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        
      />
    </GridToolbarContainer>
    
  );
}

export default EditToolbar;
