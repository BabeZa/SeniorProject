import axios from "axios";

export const MongoURL = "http://167.99.70.72:23832";
// export const hostM = "http://localhost:23823";

export default axios.create({
    baseURL: MongoURL
});