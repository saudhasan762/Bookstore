import AxiosService from './AxiousServices.js';
const baseUrl = "https://new-bookstore-backend.herokuapp.com/";
const axios = new AxiosService();

export default class UserServices{

    register = (data) => {
        
        return axios.postMethod(baseUrl+"bookstore_user/registration",data);
    }

    login = (data) => {
        console.log("inside login",data);
        return axios.postMethod(baseUrl+"bookstore_user/login",data);
    }
}