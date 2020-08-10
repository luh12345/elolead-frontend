import axios from "axios";

let client = axios.create({
  baseURL: process.env.apiUrl,
  timeout: 0
});

client.interceptors.request.use(
  req => {
    let loggedUser = JSON.parse(sessionStorage.getItem("logged_user"));
    if (loggedUser) {
      req.headers.Authorization = "Bearer " + loggedUser.token;
    }

    return req;
  },
  err => {
    Promise.reject(err);
  }
);

client.interceptors.response.use(
  req => {
    return Promise.resolve(req.data);
  },
  err => {
    if (err.response.status === 401) {
      sessionStorage.removeItem("logged_user");
    }
    return Promise.reject(err.response.data);
  }
);

export default client;
