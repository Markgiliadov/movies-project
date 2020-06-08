import { useState, useEffect } from "react";

const useFetch = (props, searchInput) => {
  const [stateMovies, setStateMovies] = useState([]);

  useEffect(() => {
    let movieUrl = "";
    let myMovies = [];
    let id_info = [];
    let urlString = "";
    let baseUrl = "";
    let midUrl = "";
    let endUrl = "";
    const FetchingTheMovies = async (searchInput) => {
      console.log("PRINTIG");

      if (searchInput !== "" || !props.isSearched) {
        if (props.baseSearchUrl) {
          baseUrl = props.baseSearchUrl;
          midUrl = searchInput;
          endUrl = props.API_KEY_SEARCH;
        } else {
          baseUrl = props.baseNotSearchedUrl;
          endUrl = props.API_KEY_MOVIE;
        }
        urlString = baseUrl.concat(midUrl, endUrl);
        await fetch(urlString) // need to give urlString
          .then((res) => res.json())
          .then((json) => {
            for (const [i, result] of json.results.entries()) {
              id_info[i] = result.id;
              console.log("PRINTIG");
            }
          })
          .catch((error) => console.log(error));
        for (const [i, id] of id_info.entries()) {
          movieUrl = props.baseMovieUrl + id + props.API_KEY_MOVIE;
          myMovies[i] = await fetch(movieUrl)
            .then((res) => res.json())
            .then((json) => json);
        }
      }
      console.log(myMovies);
      setStateMovies(() => myMovies);
    };
    FetchingTheMovies(searchInput);
  }, [searchInput]);
  console.log(stateMovies);
  return stateMovies;
};

export default useFetch;
