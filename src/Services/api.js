import axios from 'axios';

//Base da Url da API: https://api.themoviedb.org/3/
// Url da API: https://api.themoviedb.org/3/movie/now_playing?api_key=6db4cf2b02053cfbcd7e541147377f9a&language=pt-BR

export const API_KEY = '6db4cf2b02053cfbcd7e541147377f9a';
export const LANGUAGE = 'pt-BR';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: API_KEY,
        language: LANGUAGE,
        include_image_language: 'pt-BR,pt,null',
    }
});

export default api;
