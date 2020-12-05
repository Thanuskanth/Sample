import { GET_RECEIPT,ADD_RECEIPT,DELETE_RECEIPT,UPDATE_RECEIPT } from '../actions/type';

const initialState = {
    receipt: [],
    curent:{},
    iscurent:false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RECEIPT:
            return {
                ...state,
                receipt: action.payload,
                iscurent:false

            }

        case ADD_RECEIPT:
            return {
                ...state,
                receipt: [...state.receipt, action.payload],
                curent:action.payload,
                iscurent:true

            }
            case DELETE_RECEIPT:
                return{
                    ...state,
                    receipt:state.receipt.filter(receipt=>receipt.id!==action.payload),
                    iscurent:false

                }
                case UPDATE_RECEIPT:
                    state.receipt=state.receipt.filter(receipt=>receipt.id!==action._id)
                    return{
                        ...state,
                        receipt: [...state.receipt, action.payload],
                        iscurent:true,
                        curent:action.payload,

                    }
    
        default: return state;
    }
}