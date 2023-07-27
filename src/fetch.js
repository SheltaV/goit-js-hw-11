import axios from "axios";

const KEY = '38496142-de810ebfa356611df49c7e659';
const baseURL = 'https://pixabay.com/api/';


async function fetchImg(search, page = 1) {
    const params = new URLSearchParams({
        key: `${KEY}`,
        q: search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: `${page}`
    });
    const {data} = await axios.get(`${baseURL}?${params}`)
    console.log(data);
    return data;
}

export {fetchImg}