import axios from "axios";

export const PostgreURL = "http://167.99.70.72:55011";
// export const hostP = "http://167.99.70.72:55011";

function getToken (){
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return user.accessToken;       // for Node.js Express back-end
    } else {
      return {};
    }
}


export default axios.create({
    baseURL: PostgreURL,
    headers: {
        "Content-type": "application/json",
        "jwtToken": getToken()
    }
});