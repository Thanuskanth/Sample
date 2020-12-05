import {GET_OWNER,ADD_OWNER,DELETE_OWNER,UPDATE_OWNER } from './type';
import axios from 'axios';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"



export const getOwner = () => (dispatch,getState) => {

    axios.get('http://localhost:8080/owner/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: GET_OWNER,
            payload: res.data
        })
    ).catch(err => console.log(err))

};

export const addOwner = (owner) => (dispatch,getState) => {
    axios.post('http://localhost:8080/owner/add', { owner_name:owner.owner_name,tag:owner.tag },header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: ADD_OWNER,
            _id: res.data._id,
             payload: res.data,
        })
    ).catch(err => console.log(err))

};

export const deleteOwner = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/owner/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_OWNER,
            payload: id
        })
    ).catch(err => console.log(err))

};
export const updateOwner = (owner) => (dispatch,getState) => {
    axios.post('http://localhost:8080/owner/' + owner.id, { owner_name: owner.owner_name,tag: owner.tag},header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_OWNER,
            _id:owner.id,
             payload:owner,
        })
    ).catch(err => console.log(err))

};
export const getAowner = (id) => dispatch => {
    axios.get('http://localhost:8080/owner/' + id,header(getFromStorage("auth"))).then(res =>
       {return(res.data)
     }
    ).catch(err => console.log(err))

};
