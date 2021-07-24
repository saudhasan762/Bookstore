import {SELECT_BOOK} from '../Actions/Actions';

const initialState = {
    bookDetails: []
}

export default function (state = initialState, action) {
    console.log(action);
    switch(action.type){
        case SELECT_BOOK:
            const {content} = action.payload;
            return{
                ...state, bookDetails: {content}
            }
            default: 
                return state;
    }
    
}
