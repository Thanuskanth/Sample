import { GET_DEBIT,ADD_DEBIT,DELETE_DEBIT,UPDATE_DEBIT,DELETE_DEBITCUR } from '../actions/type';

const initialState = {
    debit: [],
    curent:[],
    iscurent:false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DEBIT:
            return {
                ...state,
                debit: action.payload,
                iscurent:false
            }

        case ADD_DEBIT:
            return {
                ...state,
                debit: [...state.debit, action.payload],
                curent: action.payload,
                iscurent:true,
            }
            case DELETE_DEBIT:
                return{
                    ...state,
                    debit:state.debit.filter(debit=>debit.id!==action.payload),
                    iscurent:false
                }
                case UPDATE_DEBIT:
                    state.debit=state.debit.filter(debit=>debit.id!==action._id)
                    return{
                        ...state,
                        debit: [...state.debit, action.payload],
                        
                        
                        
                    }
                case DELETE_DEBITCUR:
                    return{
                        ...state,
                        
                        iscurent:false
                    }
                    
        default: return state;
    }
}