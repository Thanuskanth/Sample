import { GET_OWNER,ADD_OWNER,DELETE_OWNER,UPDATE_OWNER} from '../actions/type';

const initialState = {
    owner: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_OWNER:
            return {
                ...state,
                owner: action.payload
            }

        case ADD_OWNER:
            return {
                ...state,
                owner: [...state.owner, action.payload]
            }
            case DELETE_OWNER:
                return{
                    ...state,
                    owner:state.owner.filter(owner=>owner.id!==action.payload)
                }
                case UPDATE_OWNER:
                    state.owner=state.owner.filter(owner=>owner.id!==action._id)
                    return{
                        ...state,
                        owner: [...state.owner,action.payload]
                    }
    
        default: return state;
    }
}