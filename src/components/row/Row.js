import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from '../../axios';
import Preview from '../preview/Preview';

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const base_url = 'https://image.tmdb.org/t/p/original/';

    const handleSelect = (movie) => {
        if (selectedMovie === movie) setSelectedMovie(null);
        else setSelectedMovie(movie);
    };

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        };

        fetchData();
    }, [fetchUrl]);

    console.log(movies);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(
                    (movie) =>
                        ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                            <img
                                key={movie.id}
                                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                                onClick={() => {
                                    handleSelect(movie);
                                }}
                            />
                        ),
                )}
            </div>
            {selectedMovie && <Preview movie={selectedMovie} />}
        </div>
    );
}

export default Row;
