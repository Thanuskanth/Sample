import { ADD_PROGRAM,DELETE_PROGRAM,GET_PROGRAM,UPDATE_PROGRAM } from './type';
import axios from 'axios';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"

export const getProgram = () => (dispatch,getState) => {

    axios.get('http://localhost:8080/program/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: GET_PROGRAM,
            payload: res.data
        })
    ).catch(err => console.log(err))

};

export const addProgram = (program_name) => (dispatch,getState) => {
    axios.post('http://localhost:8080/program/add', { program_name },header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: ADD_PROGRAM,
            _id: res.data.id,
            payload:res.data,
        })
    ).catch(err => console.log(err))

};

export const deleteProgram = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/program/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_PROGRAM,
            payload: id
        })
    ).catch(err => console.log(err))

};
export const updateProgram = (program) => (dispatch,getState) => {
    axios.post('http://localhost:8080/program/' + program.id, { program_name: program.program_name },header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_PROGRAM,
            _id:program.id,
            payload:program,
        })
    ).catch(err => console.log(err))

};
export const getAprogram = (id) => dispatch => {
    axios.get('http://localhost:8080/program/' + id,header(getFromStorage("auth"))).then(res =>
       {return(res.data)
     }
    ).catch(err => console.log(err))

};
