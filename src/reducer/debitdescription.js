import { GET_DEBITDES,ADD_DEBITDES,UPDATE_DEBITDES,DELETE_DEBITDES} from '../actions/type';

const initialState = {
    debit: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DEBITDES:
            return {
                ...state,
                debit: action.payload
            }

        case ADD_DEBITDES:
            return {
                ...state,
                debit: [...state.debit, action.payload]
            }
            case DELETE_DEBITDES:
                return{
                    ...state,
                    debit:state.debit.filter(debit=>debit.id!==action.payload)
                }
                case UPDATE_DEBITDES:
                    state.debit=state.debit.filter(debit=>debit.id!==action._id)
                    return{
                        ...state,
                        debit: [...state.debit, action.payload]
                    }
    
        default: return state;
    }
}