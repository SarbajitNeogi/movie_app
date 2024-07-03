import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import axios from "axios";
import Img from "../assets/123.jpg"; // Import the image from assets folder
import TextareaAutosize from "@mui/material/TextareaAutosize";

const StyledImg = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const StyledTextArea = styled(TextareaAutosize)({
  width: "100%",
  minHeight: "100px",
  padding: "8px",
  fontSize: "12px", // Made text smaller
  fontFamily: "Courier New, monospace", // Movie style font
  border: "1px solid ",
  borderRadius: "4px",
  resize: "vertical",
  backgroundColor: "#fff",
  "&:focus": {
    outline: "none",
    borderColor: "#1976d2",
    boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.3)",
  },
});

const Separator = styled("hr")({
  border: "none",
  borderTop: "1px solid",
  margin: "8px 0",
});

const WatchedFilmsTracker = ({ watchedCount, FilmsCount }) => {
  const [showData, setShowData] = useState(false);
  const [completedFilms, setCompletedFilms] = useState([]);
  const [completedFilmsCount, setCompletedFilmsCount] = useState(0);
  const paperRef = useRef(null);

  const handleViewButtonClick = async () => {
    try {
      const filmsResponse = await axios.get(
        "http://localhost:8081/getAllCompletedFilm"
      );
      setCompletedFilms(filmsResponse.data);
      const countResponse = await axios.get(
        "http://localhost:8081/getCompletedFilmsCount"
      );
      setCompletedFilmsCount(countResponse.data);
      setShowData(true);
    } catch (error) {
      console.error("Error fetching completed films data:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (paperRef.current && !paperRef.current.contains(event.target)) {
      setShowData(false);
    }
  };

  useEffect(() => {
    if (showData) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showData]);

  useEffect(() => {
    const fetchCompletedFilmsCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/getCompletedFilmsCount"
        );
        setCompletedFilmsCount(response.data);
      } catch (error) {
        console.error("Error fetching completed films count:", error);
      }
    };

    fetchCompletedFilmsCount();
  }, []);

  const maxCount = Math.max(completedFilmsCount, FilmsCount);

  return (
    <Paper
      ref={paperRef}
      sx={{
        p: 2,
        margin: "auto",
        width: 300, // Adjusted width
        height: showData ? "auto" : 200, // Adjusted height when data is displayed
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#e0e0e0",
        position: "fixed",
        top: 120, // Adjusted position
        right: 18, // Adjusted position
        zIndex: 9999,
        cursor: "pointer",
        boxShadow: 6,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 8,
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 120, height: 120 }}>
            {" "}
            {/* Adjusted size */}
            <StyledImg alt="film" src={Img} />{" "}
            {/* Use the imported image variable */}
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  fontFamily: "Courier New, monospace",
                  color: "#000",
                }}
              >
                Films Watched
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "16px",
                  fontFamily: "Courier New, monospace",
                  color: "#000",
                }}
              >
                Completed Films: {maxCount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: "8px 16px",
            fontWeight: "bold",
            boxShadow: 3,
            "&:hover": {
              boxShadow: 6,
            },
            fontSize: "12px", // Adjusted button font size
            fontFamily: "Courier New, monospace", // Adjusted button font family
          }}
          onClick={handleViewButtonClick}
        >
          View
        </Button>
      </Grid>
      {showData && (
        <div
          style={{ marginTop: "10px", maxHeight: "150px", overflowY: "auto" }}
        >
          <div
            style={{
              padding: "8px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              marginBottom: "8px",
            }}
          >
            {completedFilms.map((film, index) => (
              <div key={film.filmId}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Courier New, monospace",
                    color: "#000",
                  }}
                >
                  Film ID: {film.filmId}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Courier New, monospace",
                    color: "#000",
                  }}
                >
                  Title: {film.title}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Courier New, monospace",
                    color: "#000",
                  }}
                >
                  Description: {film.description}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Courier New, monospace",
                    color: "#000",
                  }}
                >
                  Release Year: {film.releaseyear}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{
                    fontSize: "12px",
                    fontFamily: "Courier New, monospace",
                    color: "#000",
                  }}
                >
                  Length: {film.length}
                </Typography>
                {index !== completedFilms.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default WatchedFilmsTracker;
