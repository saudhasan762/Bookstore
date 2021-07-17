import axios from 'axios';

export default class AxiosService{

    getMethod = (url, isHeaderRequired = false) => {
        return axios.get(url, isHeaderRequired)
    }

    postMethod = (url, data, isHeaderRequired = false) => {
        return axios.post(url,data, isHeaderRequired)
    }
}