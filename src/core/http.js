import axios from 'axios';

const http = axios.create({
  headers: {
    'x-rapidapi-key': '1c540b13a6mshaca00eabb3bcea6p13fc2ajsnf4c820198dc0',
  },
  timeout: 15000,
});

export default http;
