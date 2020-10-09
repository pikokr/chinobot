import {UPDATE_SESSION} from "../actions/session";

const initialState = {
    user: null,
    loggedIn: false,
    token: null
}

const session = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_SESSION:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default session
