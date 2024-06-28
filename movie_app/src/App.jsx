import axios from "axios";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./theme/Theme";
import Box from "@mui/material/Box";
import FilmGrid from "./grid/FilmGrid";
//import SearchBar from "./searchBar/SearchBar";
import { useState, useEffect } from "react";
//import ClippedSideBar from "./SideBar/ClippedSideBar";
//import ButtonDelete from "./button/ButtonDelete";
import DrawerAppBar from "./appbar/DrawerAppBar";
import WatchedFilmsTracker from "./watchedFilmsTracker/WatchedFilmsTracker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./inbox/Contact";
import { Switch } from "@mui/material";

function App() {
  const [filmSearch, setFilmSearch] = useState([]);
  const [watchedCount, setWatchedCount] = useState(0);
  const [completedFilms, setCompletedFilms] = useState([]);
  const [FilmsCount, setCompletedFilmsCount] = useState(0);

  // const fetchCompletedFilms = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8081/getAllCompletedFilm"
  //     );
  //     setCompletedFilms(response.data);
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error fetching completed films:", error);
  //   }
  // };

  // const fetchCompletedFilmsCount = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8081/getCompletedFilmsCount"
  //     );
  //     setCompletedFilmsCount(response.data.count);
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error fetching completed films count:", error);
  //   }
  // };

  const fetchCompletedFilmsCount = async () => {
    try {
      const filmsResponse = await axios.get(
        "http://localhost:8081/getAllCompletedFilm"
      );
      setCompletedFilms(filmsResponse.data);
      const countResponse = await axios.get(
        "http://localhost:8081/getCompletedFilmsCount"
      );
      setCompletedFilmsCount(countResponse.data);
      // setShowData(true);
    } catch (error) {
      console.error("Error fetching completed films data:", error);
    }
  };

  const fetchAllFilms = async () => {
    const apiUrl = "http://localhost:8081/getAllFilm";
    try {
      const response = await axios.get(apiUrl);
      console.log("Fetched all films:", response.data);
      setFilmSearch(response.data);
    } catch (err) {
      console.error("Error fetching film data:", err);
    }
  };

  const filmData = async (data) => {
    if (data == null || data.trim() === "") {
      // If search input is empty, fetch all films
      fetchAllFilms();
    } else {
      // Otherwise, fetch search results
      const payload = { title: data };
      console.log("Search payload:", payload);
      try {
        const response = await axios.post(
          "http://localhost:8081/search",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Search results:", response.data);
        setFilmSearch(response.data);
      } catch (err) {
        console.error("Error searching films:", err);
      }
    }
  };

  // Initial fetch for all films
  useEffect(() => {
    fetchAllFilms();
  }, []);
  const [filmDelete, setfilmDelete] = useState([]);
  const gethandleDelete = (filmChecked) => {
    //console.log(filmChecked.row.id+1);

    setfilmDelete(filmChecked);
  };

  const handleDelete = (newFilm) => {
    console.log(newFilm);
    setFilmSearch(newFilm);
    //console.log(filmSearch);
  };

  const handleCheckboxClick = (id, isChecked) => {
    setFilmSearch((prevFilms) =>
      prevFilms.map((film) => {
        if (film.id === id) {
          if (isChecked && !film.checked) {
            setWatchedCount((prevCount) => prevCount + 1);
          } else if (!isChecked && film.checked) {
            setWatchedCount((prevCount) => prevCount - 1);
          }
          return { ...film, checked: isChecked };
        }
        return film;
      })
    );
  };

  return (
    <Router>
      <>
        {/* <ThemeProvider theme={Theme}>
      <Box className="BackgroundScreen" sx={{ backgroundColor: 'background.default' }}> */}

        <div className="BackgroundScreen">
          {/* <ClippedSideBar /> */}
          <div className="AppBarDrawer">
            <DrawerAppBar searchData={filmData} />
          </div>
          <Routes>
          <Route path="/" element={<FilmGrid
            Search={filmSearch}
            fetchAllFilms={fetchAllFilms}
            handleCheckboxClick={handleCheckboxClick}
            fetchCompletedFilmsCount={fetchCompletedFilmsCount}
          />}/>
          <Route path="/contact" element={<Contact />} />
        
          </Routes>
          {/* <div className="searchButton">
        <SearchBar searchData={filmData} />
        </div> */}

          {/* <div className="ButtonDelete">
          <ButtonDelete
            filmChecked={filmDelete}
            filmSearch={filmSearch}
            setHandleDelete={handleDelete}
          />
        </div> */}
        </div>

        {/* </Box>
    </ThemeProvider> */}
        <WatchedFilmsTracker FilmsCount={FilmsCount} />
      </>
    </Router>
  );
}

export default App;
