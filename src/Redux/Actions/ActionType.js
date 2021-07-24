import {SELECT_BOOK} from "./Actions"

export const bookselect = content => ({
    type: SELECT_BOOK,
    payload: {content}
})