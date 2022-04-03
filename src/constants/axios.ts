import _axios from "axios";

const axios = _axios.create({
	baseURL: `www.example.com`,
})

export default axios