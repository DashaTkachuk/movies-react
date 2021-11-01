import React from "react";
import {Movies} from '../components/Movies'
import {Search} from '../components/Search'
import {Preloader} from '../components/Preloader'

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
    state = {
        movies: [],
        loaging: true,
    }

    componentDidMount() {
        fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=matrix`)
            .then(response => response.json())
            .then((data) =>
                this.setState({ movies: data.Search, loaging: false })
            )
            .catch((err) => {
                console.error(err);
                this.setState({ loaging: false })
            });
    }

    searchMovies = (str, type = 'all') => {
        this.setState({ loaging: true })
        fetch(
            `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${str}${type !== 'all' ? `&type=${type}` : ''
            }`
        )
            .then(response => response.json())
            .then(data =>
                this.setState({ movies: data.Search, loaging: false })
            )
            .catch((err) => {
                console.error(err);
                this.setState({ loaging: false })
            });
    }

    render() {
        const { movies, loaging } = this.state;

        return (
            <main className='container content'>
                <Search searchMovies={this.searchMovies} />
                {loaging ? <Preloader /> : < Movies movies={movies} />} 
            </main>
        );
    }
}

export { Main };
