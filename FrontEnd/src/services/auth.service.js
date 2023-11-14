import axios from "axios";
// import hostP from "../apis/PostgreURL"
import authHeader from './auth-header';
const API_URL = "http://167.99.70.72:55011";


class AuthService {
  login(username, password) {
    return axios
      .post(API_URL  + "/auth/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

//   register(username, email, password) {
//     return axios.post(API_URL + "signup", {
//       username,
//       email,
//       password
//     });
//   }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAuth() {
    // console.log("[auth.service.js] getAdminContent : done :"+ API_URL);

    return axios.get(API_URL + '/auth/verify', { headers: authHeader() });
  }
}

export default new AuthService();