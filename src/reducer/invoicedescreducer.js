import { GET_INVOICEDESC,ADD_INVOICEDESC,DELETE_INVOICEDESC,UPDATE_INVOICEDESC,UPP_INVOICEDESC} from '../actions/type';

const initialState = {
    invoicedescription: [] ,
    curent:{}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_INVOICEDESC:
            return {
                ...state,
                invoicedescription: action.payload
            }

        case ADD_INVOICEDESC:
            return {
                ...state,
                invoicedescription: [...state.invoicedescription, action.payload],
                curent: action.payload
            }
            case DELETE_INVOICEDESC:
                return{
                    ...state,
                    invoicedescription:state.invoicedescription.filter(invoicedescription=>invoicedescription.id!==action.payload)
                }
                case UPDATE_INVOICEDESC:
                    state.invoicedescription=state.invoicedescription.filter(invoicedescription=>invoicedescription.id!==action._id)
                    return{
                        ...state,
                        invoicedescription: [...state.invoicedescription, action.payload]
                    }
                case UPP_INVOICEDESC:
                        return{
                            ...state,
                            curent: action.payload
                        }
                    
        default: return state;
    }
}