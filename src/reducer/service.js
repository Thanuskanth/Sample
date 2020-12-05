import { GET_SERVICE,ADD_SERVICE,DELETE_SERVICE,UPDATE_SERVICE } from '../actions/type';

const initialState = {
    service: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SERVICE:
            return {
                ...state,
                service: action.payload
            }

        case ADD_SERVICE:
            return {
                ...state,
                service: [...state.service, action.payload]
            }
            case DELETE_SERVICE:
                return{
                    ...state,
                    service:state.service.filter(service=>service.id!==action.payload)
                }
                case UPDATE_SERVICE:
                    state.service=state.service.filter(service=>service.id!==action._id)
                    return{
                        ...state,
                        service: [...state.service, action.payload]
                    }
    
        default: return state;
    }
}