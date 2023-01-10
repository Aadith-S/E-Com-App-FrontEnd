import axios from "./axiosInstance"

const getProfile = async()=>{
    return await axios.get("/profile");
}

export {getProfile}