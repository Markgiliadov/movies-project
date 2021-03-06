import { useState, useEffect } from "react";

const useFetch = (props, searchInput, dispatch, state) => {
  const [stateMovies, setStateMovies] = useState([]);

  useEffect(() => {
    // setStateMovies([]);
    let movieUrl = "";
    let myMovies = [];
    // let id_info = [];
    let urlString = "";
    let baseUrl = "";
    let midUrl = "";
    let endUrl = "";
    const FetchingTheMovies = async (searchInput) => {
      setStateMovies([]);
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
          .then(async (json) => {
            for (const [i, result] of json.results.entries()) {
              movieUrl = props.baseMovieUrl + result.id + props.API_KEY_MOVIE;
              myMovies[i] = await fetch(movieUrl)
                .then((res) => res.json())
                .then((movie) => movie);
            }
            setStateMovies(() => myMovies);
          })
          .catch((error) => console.log(error));

        // setLoading(false);
        dispatch({ type: "spinnerStatus", payload: false });
      }
    };

    FetchingTheMovies(searchInput);
  }, [
    searchInput,
    dispatch,
    props.API_KEY_MOVIE,
    props.API_KEY_SEARCH,
    props.baseMovieUrl,
    props.baseNotSearchedUrl,
    props.baseSearchUrl,
    props.isSearched,
  ]);

  return stateMovies;
};

export default useFetch;
