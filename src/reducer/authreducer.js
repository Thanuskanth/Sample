import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, AUTH_ERROR,USER_LOADING,REGISTER_SUCCESS, USER_LODED,UPDATE_USER,DELETE_LEAVE,UPDATE_LEAVE ,ADD_LEAVE} from '../actions/type';
import{ removeFromStorage,setInStorage} from "../storage/index"

const initialState = {
    user: [],
    isauthendicate: false,
    loading:false,
}
export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return{
                loading:true
            }
            
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:

            return {
                ...state,
                ...action.payload,
                isauthendicate: true,
                loading:false
            }
        case USER_LODED:
             
                return {    
                    isauthendicate: true,
                    user:action.payload,
                    loading:false
                }
    
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            removeFromStorage("token")

            return {
                ...state,
                user: [],
                isauthendicate: false
            }
        case UPDATE_USER:
                // state.user=state.user.filter(user=>user._id!==action.payload._id)
                return{
                    ...state,
                    user: action.payload,
                    isauthendicate: true,
                    loading:false
                }
                  
        default: return state;
    }
}
