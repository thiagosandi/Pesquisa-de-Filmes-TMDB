import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.jsx'
import $ from 'jquery'

class App extends Component {

  constructor(props){
      super(props)
      this.state = {}
      this.performSearch()
  }

  performSearch(searchTerm) {
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=e091522dbaa9e6c61436ed38e1d2766a&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        var movieRows = []
        const results = searchResults.results
        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          const movieRow = <MovieRow key={movie.id} movie={movie} />
          movieRows.push(movieRow)
        })
        this.setState({rows: movieRows})
      },

      error: (xhr, status, err) => {
        console.error("Failer")
      }
    })
  }

  searchChangeHandler(event) {
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return(
      <div className="App">
      <table className="tittleBar">
        <tbody>
          <tr>
            <td>
            <img alt="app icon" width={50} src="icon.jpg" />
            </td>
            <td width= '8'/>
            <td>
            <h1>MoviesDB Search</h1>
            </td>
          </tr>
        </tbody>
      </table>

      <input style={{
        fontSize: 24,
        display: 'block',
        width: "99%",
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16
      }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term" />

      {this.state.rows}
      </div>

    );
  }
}

export default App;
