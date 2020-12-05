import { ADD_PACKAGE,DELETE_PACKAGE,UPDATE_PACKAGE,GET_PACKAGE } from './type';
import axios from 'axios';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"

export const getPackage = () => (dispatch,getState) => {

    axios.get('http://localhost:8080/package/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: GET_PACKAGE,
            payload: res.data
        })
    ).catch(err => console.log(err))

};

export const addPackage = (package_name) => (dispatch,getState) => {
    axios.post('http://localhost:8080/package/add', { package_name},header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: ADD_PACKAGE,
            _id: res.data._id,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};

export const deletePackage = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/package/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_PACKAGE,
            payload: id
        })
    ).catch(err => console.log(err))

};
export const updatePackage = (pac) => (dispatch,getState) => {
    axios.post('http://localhost:8080/package/' + pac.id, { package_name: pac.package_name },header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_PACKAGE,
            _id:pac.id,
            payload:pac,
        })
    ).catch(err => console.log(err))

};
export const getApackage = (id) => dispatch => {
    axios.get('http://localhost:8080/package/' + id,header(getFromStorage("auth"))).then(res =>
       {return(res.data)
     }
    ).catch(err => console.log(err))

};
