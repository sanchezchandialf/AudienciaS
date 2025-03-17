import axios from "axios"
const API_URL="https://webapiaudiencia.azurewebsites.net/api";

export default axios.create({

    baseURL:API_URL
})