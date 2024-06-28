import React, { useEffect, useState } from "react";
import axios from "axios";

const FilmTable = () => {
  // useEffect(() => {
  //     axios
  //     .get('http://localhost:8081/getAllFilm')
  //     .then((res)=>console.log(res))
  // }, []);

  const [film, setFilm] = useState([]);

  useEffect(() => {
    async function fetchDevices() {
      const apiUrl = "http://localhost:8081/getAllFilm";

      const response = await axios.get(apiUrl);
      console.log(response.column);
      // console.log(response.data[0]);
      setFilm(response.data);
    }
    fetchDevices();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Film ID</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {film.map((item) => (
            <tr key={item.filmId}>
              <td>{item.filmId}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilmTable;
