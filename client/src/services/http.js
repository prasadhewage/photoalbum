import axios from 'axios';

let config = {
    headers: {
      'Content-Type': 'application/json',
  }
}

export function GET(url, data = null) {
  config["params"] = data;

  return axios.get(`${url}`, config);
};

export function POST(url, data) {  
  return axios.post(`${url}`, data, config);
};