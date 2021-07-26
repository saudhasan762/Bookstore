import { applyMiddleware, createStore } from "redux";
import BookReducers from "../Reducers/BookReducers";
import thunkmiddleware from "redux-thunk";


const middleware = applyMiddleware(thunkmiddleware);

export default createStore(BookReducers,middleware);