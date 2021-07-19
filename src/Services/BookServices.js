import AxiosService from "./AxiousServices";
const axios = new AxiosService();
const baseUrl = "https://new-bookstore-backend.herokuapp.com/";

export default class BookServices{

    getAllBooks = () => {
        return axios.getMethod(baseUrl + "bookstore_user/get/book");
    }
}
