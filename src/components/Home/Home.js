import React, { Component } from "react";
// import Auxil from "../../hoc/Auxil/Auxil";
import PopularMovies from "../../containers/Movies/PopularMovies/PopularMovies";
import NowPlayingMovies from "../../containers/Movies/NowPlayingMovies/NowPlayingMovies";
import UpcomingMovies from "../../containers/Movies/UpcomingMovies/UpcomingMovies";
// import LoginSideDrawer from "../LoginSideDrawer/LoginSideDrawer";
// import { Route } from "react-router-dom";
// import Toolbar from "../Toolbar/Toolbar";
class Home extends Component {
  state = {
    basePopularUrl: "https://api.themoviedb.org/3/movie/popular",
    baseMovieUrl: "https://api.themoviedb.org/3/movie/",
    API_KEY_MOVIE: "?api_key=d0a9ee76df15c9c8e455000b78e70a56",
    API_KEY_SEARCH: "&api_key=d0a9ee76df15c9c8e455000b78e70a56",
  };
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        {/* <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} /> */}
        {/* <Login /> */}
        {/* <GeneralMovies
          isPopular
          basePopularUrl={this.state.basePopularUrl}
          baseMovieUrl={this.state.baseMovieUrl}
          API_KEY_MOVIE={this.state.API_KEY_MOVIE}
          API_KEY_SEARCH={this.state.API_KEY_SEARCH}
        /> */}
        {/* <label>Popular Movies:</label> */}
        <h1 style={{ textAlign: "center" }}>Upcoming Movies</h1>
        <UpcomingMovies />
        <h1 style={{ textAlign: "center" }}>Popular Movies</h1>
        <PopularMovies />
        <h1 style={{ textAlign: "center" }}>Now Playing Movies</h1>
        <NowPlayingMovies />
        {/* <Route path="/:id" exact component={Movies} /> */}
        {/* <GenericMovies /> */}
      </div>
    );
  }
}

export default Home;
