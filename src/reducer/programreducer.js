import {GET_PROGRAM,ADD_PROGRAM,DELETE_PROGRAM,UPDATE_PROGRAM } from '../actions/type';

const initialState = {
    program: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROGRAM:
            return {
                ...state,
                program: action.payload
            }

        case ADD_PROGRAM:
            return {
                ...state,
                program: [...state.program, action.payload]
            }
            case DELETE_PROGRAM:
                return{
                    ...state,
                    program:state.program.filter(program=>program.id!==action.payload)
                }
                case UPDATE_PROGRAM:
                    state.program=state.program.filter(program=>program.id!==action._id)
                    return{
                        ...state,
                        program: [...state.program, action.payload]
                    }
    
        default: return state;
    }
}