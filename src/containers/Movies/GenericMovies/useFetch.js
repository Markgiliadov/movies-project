import { useState, useEffect } from "react";

const useFetch = async (props, searchInput) => {
  const [stateMovies, setStateMovies] = useState([]);
  //   let myInput = searchInput;
  //   console.log(myInput);
  useEffect(() => {
    // async function fetch() {
    //   await FetchingTheMovies(searchInput);
    // }
    // fetch();
    FetchingTheMovies(searchInput);
    // return setStateMovies([]);
  }, [searchInput]);
  const FetchingTheMovies = async (searchInput) => {
    let movieUrl = "";
    let myMovies = [];
    let id_info = [];
    let urlString = "";
    let baseUrl = "";
    let midUrl = "";
    let endUrl = "";
    if (searchInput !== "" || !props.isSearched) {
      console.log(props.baseSearchUrl);
      if (props.baseSearchUrl) {
        baseUrl = props.baseSearchUrl;
        midUrl = searchInput;
        endUrl = props.API_KEY_SEARCH;
      } else {
        baseUrl = props.baseNotSearchedUrl;

        endUrl = props.API_KEY_MOVIE;
      }
      console.log(baseUrl);
      urlString = baseUrl.concat(midUrl, endUrl);
      console.log("url " + urlString + "inp is: " + searchInput);
      await fetch(urlString) // need to give urlString
        .then((res) => res.json())
        .then((json) => {
          console.log(json.results);
          for (const [i, result] of json.results.entries()) {
            id_info[i] = result.id;
          }
        })
        .catch((error) => console.log(error));
      console.log("i am here" + id_info);
      for (const [i, id] of id_info.entries()) {
        movieUrl = props.baseMovieUrl + id + props.API_KEY_MOVIE;
        console.log(movieUrl);
        myMovies[i] = await fetch(movieUrl)
          .then((res) => res.json())
          .then((json) => json);
      }
      setStateMovies(() => myMovies);

      console.log(stateMovies);
    }
  };
  console.log(stateMovies);
  return stateMovies;
};

export default useFetch;
