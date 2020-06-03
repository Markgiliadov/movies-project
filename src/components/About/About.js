import React, { useState, useEffect } from "react";
import Movie from "../Movie/Movie";
const About = (props) => {
  const [movies, setMovies] = useState([]);
  let myMovies = null;
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=d0a9ee76df15c9c8e455000b78e70a56";
  let myPath = null;
  let imgUrl = "https://image.tmdb.org/t/p/w185/";

  myMovies = movies.map((movie) => {
    myPath = movie.poster_path;

    return (
      <div style={{ display: "flex" }}>
        <h2>{movie.title}</h2>
        <Movie
          // style={{ alignSelf: "flex-start" }}
          isSearched={props.isSearched}
          key={movie.id}
          title={movie.title}
          image={imgUrl + myPath}
          description={movie.overview}
          name={movie.title}
          rating={movie.vote_average}
        />
      </div>
    );
  });
  useEffect(async () => {
    const data = await getData();
    console.log(data);
    setMovies(() => data);
  }, []);
  const getData = async () => {
    const data = await fetch(url).then((res) =>
      res.json().then((data) => data.results)
    );
    return data;
  };
  return (
    <div
      style={{
        // width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        // alignItems: "center",
        alignContent: "flex-start",
      }}
    >
      {myMovies}
    </div>
  );
};

export default About;
