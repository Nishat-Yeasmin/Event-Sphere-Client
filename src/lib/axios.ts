import axios from "axios";


const api = axios.create({

  baseURL:"https://event-sphere-server-nu.vercel.app",

  withCredentials:true,

});


export default api;