import { GET_ITEM,ADD_ITEM,DELETE_ITEM,UPDATE_ITEM } from '../actions/type';

const initialState = {
    item: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEM:
            return {
                ...state,
                item: action.payload
            }

        case ADD_ITEM:
            return {
                ...state,
                item: [...state.item, action.payload]
            }
            case DELETE_ITEM:
                return{
                    ...state,
                    item:state.item.filter(item=>item.id!==action.payload)
                }
                case UPDATE_ITEM:
                    state.item=state.item.filter(item=>item.id!==action._id)
                    return{
                        ...state,
                        item: [...state.item, action.payload]
                    }
    
        default: return state;
    }
}