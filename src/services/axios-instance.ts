import axios from "axios";

const axiosInstance = {
  testBaseAxios: axios.create({
    baseURL: "https://wizard-world-api.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
    },
  }),
};

export default axiosInstance;