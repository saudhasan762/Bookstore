import {SELECT_BOOK, GET_BOOKS, SEARCH_BOOK, GET_COUNT} from "./Actions"
import BookServices from "../../Services/BookServices";
const service = new BookServices();

export const bookselect = detail => ({
    type: SELECT_BOOK,
    payload: {detail}
})

// export const getBooks = content => ({
//     // console.log(content);
//     // var book = []
//     // service.getAllBooks().then((res)=> {
//     //     console.log(res);
//     //     book = res.data.result;
//     //     console.log(book);
//     //     console.log(this.state.books);
//     // }).catch((err)=> {
//     //     console.log(err);
//     // })
//     // getAllBooks(book);
// })

export const getBooks = books => ({
    type: GET_BOOKS,
    payload: {books}
})

export const searchBook = search => ({
    type:   SEARCH_BOOK,
    payload: {search} 
})

export const cartCount = count => ({
    type: GET_COUNT,
    payload: {count}
})