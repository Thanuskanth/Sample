import { GET_PROPAC,DELETE_PROPAC,UPDATE_PROPAC,ADD_PROPAC} from '../actions/type';

const initialState = {
    program_package: [],
    curentinvoice:{},
    iscurent:false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROPAC:
            return {
                ...state,
                program_package: action.payload
            }

        case ADD_PROPAC:
            return {
                ...state,
                program_package: [...state.program_package, action.payload],
                curentinvoice:action.payload,
                iscurent:true
            }
            case DELETE_PROPAC:
                return{
                    ...state,
                    program_package:state.program_package.filter(ivoice=>ivoice.id!==action.payload),
                    iscurent:false
                }
                case UPDATE_PROPAC:
                    state.program_package=state.program_package.filter(ivoice=>ivoice.id!==action._id)
                    return{
                        ...state,
                        program_package: [...state.program_package, action.payload],
                        curentinvoice:action.payload,
                        iscurent:true
                    }
    
        default: return state;
    }
}