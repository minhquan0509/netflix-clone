import React, { useEffect, useState } from 'react';
import './Preview.css';
import youtube from '../../youtube';
function Preview({ movie }) {
    const [trailerID, setTrailerID] = useState(null);
    const baseLink = 'https://www.youtube.com/embed/';
    useEffect(() => {
        const getVideo = async () => {
            const res = await youtube.get('/search', {
                params: {
                    q: `${movie?.title || movie?.name || movie?.original_name} trailer`,
                },
            });
            console.log(res.data.items);
            setTrailerID(res.data.items[0].id.videoId);
        };
        getVideo();
    }, [movie.title, movie.name, movie.original_name]);

    return (
        <div className="preview">
            {trailerID && (
                <iframe
                    className="preview__video"
                    src={baseLink + trailerID}
                    frameborder="0"
                    title={movie.title}
                ></iframe>
            )}
            <div className="preview__details">
                <h2>{movie?.title || movie?.name || movie?.original_name}</h2>
                <h3>{movie?.release_date}</h3>
                <p>{movie?.overview}</p>
            </div>
        </div>
    );
}

export default Preview;
