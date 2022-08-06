import axios from "axios";

const token: string = "";

const custom_axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization: "Bearer"+ token,
        Accept: "*/*",
        "Content-Type": "application/json"
    },
    timeout: 500,

})

export default custom_axios;