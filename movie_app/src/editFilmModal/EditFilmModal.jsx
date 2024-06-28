import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

const EditFilmModal = ({
  isOpen,
  handleClose,
  handleSave,
  editingRow,
  handleInputChange,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Film
        </Typography>
        {/* <TextField
          margin="normal"
          label="Film ID"
          name="filmId"
          value={editingRow.filmId || ""}
          onChange={handleInputChange}
          fullWidth
        /> */}
        <TextField
          margin="normal"
          label="Title"
          name="title"
          value={editingRow.title || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Description"
          name="description"
          value={editingRow.description || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Release Year"
          name="releaseyear"
          type="number"
          value={editingRow.releaseyear || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Length"
          name="length"
          type="number"
          value={editingRow.length || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={handleClose} variant="contained" color="secondary">
          <CloseIcon /> Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Done
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditFilmModal;
