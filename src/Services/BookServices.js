import AxiosService from "./AxiousServices";
const axios = new AxiosService();
const baseUrl = "https://new-bookstore-backend.herokuapp.com/";

export default class BookServices{

    getAllBooks = () => {
        return axios.getMethod(baseUrl + "bookstore_user/get/book");
    };

    addToCart = (data, product_id,token) => {
        console.log(product_id);
        return axios.postMethod(`${baseUrl}bookstore_user/add_cart_item/${product_id}`,data,{
            headers: {'x-access-token': token}
        })
    };

    getCartItems = () => {
        return axios.getMethod(`${baseUrl}bookstore_user/get_cart_items`,{
            headers: {'x-access-token': localStorage.getItem('Token')}
        })
    };

    cartIncrementDecrement = (data,cartItem_id) => {
        return axios.putMethod(`${baseUrl}bookstore_user/cart_item_quantity/${cartItem_id}`,data,{
            headers:{'x-access-token' :localStorage.getItem('Token')} 
        })     
    }

    removeCartItem = (id) => {
        console.log(id);
        return axios.deleteMethod(`${baseUrl}bookstore_user/remove_cart_item/${id}`,{
            headers:{'x-access-token':localStorage.getItem('Token')}
        });
    }

    userDetails=(data)=>{
        return axios.putMethod(`${baseUrl}bookstore_user/edit_user`,data,{
            headers:{'x-access-token' :localStorage.getItem('Token')} 
        })     
    }

    order=(data)=>{
        console.log(localStorage.getItem('Token'));
        return axios.postMethod(`${baseUrl}bookstore_user/add/order`,data,{
            headers:{'x-access-token':localStorage.getItem('Token')}
        });
    }

    cartQuantity = (data, product_id) => {
        return axios.putMethod(`${baseUrl}"bookstore_user/cart_item_quantity/${product_id}`,data,{
            headers: {'x-access-token': localStorage.getItem('Token')}
        })
    }

    addToWishList=(product_id)=>{
        return axios.postMethod(` ${baseUrl}bookstore_user/add_wish_list/${product_id}`,null,{
            headers:{'x-access-token':localStorage.getItem('Token')}
        });
    }

    getWishList = () => {
        return axios.getMethod(`${baseUrl}bookstore_user/get_wishlist_items/`,{
            headers:{'x-access-token':localStorage.getItem('Token')}
        });
    }

    removeFromWishList = (id) => {
        return axios.deleteMethod(`${baseUrl}bookstore_user/remove_wishlist_item/${id}`,{
            headers:{'x-access-token':localStorage.getItem('Token'),}
        });
    }
}
