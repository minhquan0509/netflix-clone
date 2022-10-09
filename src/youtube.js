import axios from 'axios';

const KEY = 'AIzaSyCv5GgFHwiLyJO5cc-y89bQ1SGDTuex098';
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResult: 5,
        key: KEY,
        type: 'video',
    },
});
