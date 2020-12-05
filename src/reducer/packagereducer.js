import { GET_PACKAGE,ADD_PACKAGE,DELETE_PACKAGE,UPDATE_PACKAGE } from '../actions/type';

const initialState = {
    package: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PACKAGE:
            return {
                ...state,
                package: action.payload
            }

        case ADD_PACKAGE:
            return {
                ...state,
                package: [...state.package, action.payload]
            }
            case DELETE_PACKAGE:
                return{
                    ...state,
                    package:state.package.filter( pac=>pac.id!==action.payload)
                }
                case UPDATE_PACKAGE:
                    state.package=state.package.filter(pac=>pac.id!==action._id)
                    return{
                        ...state,
                        package: [...state.package,action.payload]
                    }
    
        default: return state;
    }
}