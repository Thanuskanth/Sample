import { GET_CUSTOMER,ADD_CUSTOMER,DELETE_CUSTOMER,UPDATE_CUSTOMER } from '../actions/type';

const initialState = {
    customer: [],
    curent:[]
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CUSTOMER:
            return {
                ...state,
                customer: action.payload,
                curent:[]
            }

        case ADD_CUSTOMER:
            return {
                ...state,
                customer: [...state.customer, action.payload],
                curent:action.payload
            }
            case DELETE_CUSTOMER:
                return{
                    ...state,
                    customer:state.customer.filter(customer=>customer.id!==action.payload),
                    curent:[]
                }
                case UPDATE_CUSTOMER:
                    state.customer=state.customer.filter(customer=>customer.id!==action._id)
                    return{
                        ...state,
                        customer: [...state.customer, action.payload],
                        curent: action.payload
                    }
    
        default: return state;
    }
}