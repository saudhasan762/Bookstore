import {SELECT_BOOK, GET_BOOKS, SEARCH_BOOK, GET_COUNT} from '../Actions/Actions';

const initialState = {
    bookDetails: [],
    getBooks: [],
    searchData: "",
    cartCount: ""
}

export default function (state = initialState, action) {
    console.log(action);
    switch(action.type){
        case SELECT_BOOK:
            const {detail} = action.payload;
            return{
                ...state, bookDetails: {detail}
            }
        case GET_BOOKS:
            const {books} = action.payload;
            return{
                ...state, getBooks: {books}
            }
        case SEARCH_BOOK:
            const {search} = action.payload;
            return{
                ...state, searchData: {search}
            }
        case GET_COUNT:
            const {count} = action.payload;
            return{
                ...state,  cartCount: {count}
            }
        default: 
            return state;
    }
    
}
