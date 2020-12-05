import { GET_ERROR, CLEAR_ERROR, } from './type';
import axios from 'axios';

export const getError = ( msg ,status,id=null ) => dispatch => {

        dispatch({
            type: GET_ERROR,
            payload:{msg,status,id}
        })
    

};
export const clearError = () => dispatch => {

        dispatch({
            type: CLEAR_ERROR,
        })

};
