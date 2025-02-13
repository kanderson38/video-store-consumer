import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchItem from './SearchItem';
import { Redirect } from 'react-router-dom';
import './Search.css'

const SEARCH_URL = 'http://localhost:3001/movies?query='
const MOVIE_URL = 'http://localhost:3001/movies'


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieSearch: '',
            shouldRedirect: undefined,
            clickSearch: false,
            searchList: []
        }
    }

    onInputChange = (event) => {
        const updatedState = {};

        const field = event.target.name;
        const value = event.target.value;

        updatedState[field] = value;
        this.setState(updatedState);
    }

    submitSearch = (event) => {
        event.preventDefault()
        axios.get(SEARCH_URL + this.state.movieSearch)
            .then((response) => {
                const searchList = response.data.map((movie) => {
                    return <SearchItem
                        key={movie.external_id}
                        title={movie.title}
                        overview={movie.overview}
                        releaseDate={movie.release_date}
                        imageURL={movie.image_url}
                        addMovieCallback={this.addMovie}
                    />
                });
                this.setState({ searchList: searchList, movieSearch: '', clickSearch: true })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    addMovie = (movie) => {
        const movie_params = {
            'title': movie.title,
            'overview': movie.overview,
            'release_date': movie.releaseDate,
            'image_url': movie.imageURL,
        }

        axios.post(MOVIE_URL, movie_params)
            .then((response) => {
                this.setState({
                    shouldRedirect: true,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {

        if (this.state.shouldRedirect) {
            return <Redirect to='/library/' />
        }

        let results = <span></span>

        if (this.state.searchList.length > 0 && this.state.clickSearch) {
            results = this.state.searchList;
        }
        else if (this.state.searchList.length === 0 && this.state.clickSearch) {
            results = <div className="centered"><p className="error-message">Error: No results found </p></div>;
        }

        return (
            <div className="full-wrapper">
                <div className="search-form-div">
                    <form className='search-form'>
                        <label>
                            Find a movie:
                            <input name='movieSearch'
                                value={this.state.movieSearch}
                                type='text'
                                onChange={this.onInputChange}>
                            </input>
                        </label>
                        <span className="search-submit" onClick={this.submitSearch}> Search</span>
                    </form >
                </div>
                <div className='movie-item-container'>
                    {results}
                </div>
            </div>

        )
    };
}


export default Search