import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import EditToolbar from "../EditToolBar/EditToolbar";
import "./FilmGrid.css";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditFilmModal from "../editFilmModal/EditFilmModal";
import { Close as CloseIcon } from "@mui/icons-material";
import { Snackbar, SnackbarContent, IconButton } from "@mui/material";

const FilmGrid = ({
  Search,
  fetchAllFilms,
  handleCheckboxClick,
  fetchCompletedFilmsCount,
}) => {
  const [film, setFilm] = useState([]);
  const [rows, setRows] = useState(film);
  const [rowModesModel, setRowModesModel] = useState({});
  //const [shouldUpdateBackend, setShouldUpdateBackend] = useState(false);
  // const [updatedRow, setUpdatedRow] = useState(null);
  //const [selectAll,setSelectAll] = useState()
  const [filmsState, setFilmsState] = useState([]);
  const updatedRowRef = useRef(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState({});

  const columns = [
    { field: "filmId", headerName: "Film ID", width: 100, editable: true },
    { field: "title", headerName: "Title", width: 150 },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true,
    },
    {
      field: "releaseyear",
      headerName: "release year",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "length",
      headerName: "Length",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 130,
      cellClassName: "actions",
      getActions: ({ id }) => {
        //  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        // if (isInEditMode) {
        //   return [
        //     <GridActionsCellItem
        //       key={`save-${id}`}
        //       icon={<SaveIcon />}
        //       label="Save"
        //       sx={{
        //         color: "primary.main",
        //       }}
        //       onClick={handleSaveClick(id)}
        //     />,
        //     <GridActionsCellItem
        //       key={`cancel-${id}`}
        //       icon={<CancelIcon />}
        //       label="Cancel"
        //       className="textPrimary"
        //       onClick={handleCancelClick(id)}
        //       color="inherit"
        //     />,
        //   ];
        // }

        return [
          <GridActionsCellItem
            key={`edit-${id}`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,

          <GridActionsCellItem
            key={`completed-${id}`}
            icon={<CloudDoneRoundedIcon />}
            label="Completed"
            // onClick={()=>handleCheckboxClick(id)}
            onClick={() => handleCompleteClick(id)}
            // onDoubleClick={() => handleCheckboxDoubleClickWrapper(id, false)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  // const handleRowEditStop = (params, event) => {
  //   if (params.reason === GridRowEditStopReasons.rowFocusOut) {
  //     event.defaultMuiPrevented = true;
  //   }
  // };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setIsSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleAddModal = (newRecord) => {
    const id = film.length * 100; // Generate a unique ID for the new record
    const updatedFilm = [...film, { id, ...newRecord }];
    setFilm(updatedFilm);
    setRows(updatedFilm);
    //fetchAllFilms();
  };

  const handleEditClick = (id) => () => {
    const rowToEdit = rows.find((row) => row.id === id);
    setEditingRow(rowToEdit);
    setIsModalOpen(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedEditingRow = {
        ...editingRow,
        releaseyear: parseInt(editingRow.releaseyear, 10),
        length: parseInt(editingRow.length, 10),
      };

      const updatedRows = rows.map((row) =>
        row.id === updatedEditingRow.id ? { ...row, ...updatedEditingRow } : row
      );
      setRows(updatedRows);
      setFilm(updatedRows);

      await axios.post(`http://localhost:8081/updateFilm`, updatedEditingRow, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchAllFilms();
      setIsModalOpen(false);
      showSnackbar("Film edited succesfully")
    } catch (error) {
      console.error("Error updating film:", error);
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (id) => {
    const deleteFilm = async (filmId) => {
      try {
        const response = await axios.post(
          "http://localhost:8081/delete",
          { filmId }, // Pass the filmId as an object with 'filmId' property
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        fetchAllFilms();

        if (response.status === 200) {
         showSnackbar("Film deleted successfully");
          return true; // Return true if deletion is successful
        } else {
          console.error("Failed to delete film");
          return false; // Return false if deletion fails
        }
      } catch (error) {
        console.error("Error deleting film:", error);
        return false; // Return false if an error occurs
      }
    };
    // Find the film object by id to get the filmId
    const filmToDelete = film.find((item) => item.id === id);
    if (filmToDelete) {
      // Call deleteFilm with the ID of the film you want to delete
      deleteFilm(filmToDelete.filmId);

      const newFilmList = film.filter((item) => item.id !== id);
      setFilm(newFilmList);
      setRows(newFilmList);
    }
  };

  const handleCompleteClick = (id) => {
    const completeFilm = async (filmId) => {
      try {
        const response = await axios.post(
          "http://localhost:8081/completed",
          { filmId }, // Pass the filmId as an object with 'filmId' property
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        //fetchAllFilms();
        // fetchCompletedFilms();
        fetchCompletedFilmsCount();

        if (response.status === 200) {
          //console.log("Film completed successfully");
          showSnackbar("Film Completed successfully")
          return true; // Return true if deletion is successful
        } else if (response.status === 208){
          showSnackbar(response.data);
          return false; // Return false if deletion fails
        }
      } catch (error) {
        console.error("Error deleting film:", error);
        return false; // Return false if an error occurs
      }
    };
    // Find the film object by id to get the filmId
    const filmToComplete = film.find((item) => item.id === id);
    if (filmToComplete) {
      // Call deleteFilm with the ID of the film you want to delete
      completeFilm(filmToComplete.filmId);
    }
  };

  const handleCancelClick = (id) => () => {
    // setRowModesModel({
    //   ...rowModesModel,
    //   [id]: { mode: GridRowModes.View, ignoreModifications: true },
    // });
    // const editedRow = rows.find((row) => row.id === id);
    // if (editedRow.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
    // setIsModalOpen(false);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleCellEditCommit = useCallback(
    ({ id, field, value }) => {
      const updatedRowIndex = rows.findIndex((row) => row.id === id);
      if (updatedRowIndex > -1) {
        const updatedRows = [...rows];
        updatedRows[updatedRowIndex] = {
          ...updatedRows[updatedRowIndex],
          [field]: value,
        };
        setRows(updatedRows);
      }
    },
    [rows]
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = () => {
    handleSaveClick(editingRow.id);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingRow({
      ...editingRow,
      [name]: value,
    });
  };

  useEffect(() => {
    async function fetchData() {
      const filmApiUrl = "http://localhost:8081/getAllFilm";
      const actorApiUrl = "http://localhost:8081/getAllActors";
  
      try {
        const [filmResponse, actorResponse] = await Promise.all([
          axios.get(filmApiUrl),
          axios.get(actorApiUrl),
        ]);
  
        const filmsWithIds = filmResponse.data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
  
        const actorsById = {};
        actorResponse.data.forEach((actor) => {
          actorsById[actor.filmId] = actorsById[actor.filmId] || [];
          actorsById[actor.filmId].push(actor);
        });
  
        const filmsWithActors = filmsWithIds.map((film) => ({
          ...film,
          firstName: actorsById[film.filmId]?.map((actor) => actor.firstName).join(", "),
          lastName: actorsById[film.filmId]?.map((actor) => actor.lastName).join(", "),
        }));
  
        setFilm(filmsWithActors);
        setRows(filmsWithActors); // Ensure both film and rows state are updated
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();

    if (!Search || Search.length === 0) {
      fetchData()
    } else {
      const dataWithIds = Search.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setFilm(dataWithIds);
      setRows(dataWithIds);
    }
  }, [Search]);

  return (
    <div className="container" style={{ marginRight: "295px" }}>
      <Box
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "white",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableSelectionOnClick
          autoHeight={false}
          showCellVerticalBorder
          //onRowClick={gethandleDelete}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={(params, event) => {
            if (params.reason === GridRowEditStopReasons.rowFocusOut) {
              event.defaultMuiPrevented = true;
            }
          }}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: {
              setRows,
              setRowModesModel,
              handleAddModal: handleAddModal,
              fetchAllFilms: fetchAllFilms,
            },
          }}
          onCellEditCommit={handleCellEditCommit}
        />
      </Box>

      <EditFilmModal
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        handleSave={handleSaveClick}
        editingRow={editingRow}
        handleInputChange={handleInputChange}
      />

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
    </div>
  );
};

export default FilmGrid;
