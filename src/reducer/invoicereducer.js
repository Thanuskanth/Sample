import { GET_INVOICE,ADD_INVOICE,DELETE_INVOICE,UPDATE_INVOICE,DELETE_UPDATEIN,GET_AINVOICE} from '../actions/type';

const initialState = {
    invoice: [],
    curentinvoice:[],
    iscurent:false,
    ainvoice:{}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_INVOICE:
            return {
                ...state,
                invoice: action.payload
            }
        case GET_AINVOICE:
                return{
                    ...state,
                   ainvoice:action.payload
                }
        case ADD_INVOICE:
            return {
                ...state,
                invoice: [...state.invoice, action.payload],
                curentinvoice:action.payload,
                iscurent:true
            }
            case DELETE_INVOICE:
                return{
                    ...state,
                    ivoice:state.invoice.filter(invoice=>invoice.id!==action.payload),
                    iscurent:false,
                    curentinvoice:{},

                }
            case UPDATE_INVOICE:
                    state.invoice=state.invoice.filter(invoice=>invoice.id!==action._id)
                    return{
                        ...state,
                        invoice: [...state.invoice, action.payload],
                        curentinvoice:action.payload,
                        // iscurent: true
                    }
            case DELETE_UPDATEIN:
                    // state.invoice=state.invoice.filter(invoice=>invoice.id!==action._id)
                    return{
                        ...state,
                       
                        iscurent:false
                    }
    
        default: return state;
    }
}