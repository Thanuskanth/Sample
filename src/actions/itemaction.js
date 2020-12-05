import { GET_ITEM,ADD_ITEM,DELETE_ITEM,UPDATE_ITEM } from './type';
import axios from 'axios';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"

export const getItem = () => (dispatch,getState) => {

    axios.get('http://localhost:8080/item/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: GET_ITEM,
            payload: res.data
        })
    ).catch(err => console.log(err))

};
export const getAitem=(id)=>(dispatch,getState)=>{

    axios.get('http://localhost:8080/item/' +id,header(getFromStorage("auth")))
        .then(data =>Response.json(data))
        .catch(err => console.log(err))
}
export const updateItem = ( item) => (dispatch,getState,) => {
    axios.post('http://localhost:8080/item/' +item.id,{ item_name:item.item_name,amount:item.amount,detail:item.detail,service:item.service},header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_ITEM,
            _id:item.id,
           payload:item
        })
    ).catch(err => console.log(err))

};

export const addItem = (item) => (dispatch,getState) => {
    axios.post('http://localhost:8080/item/add', item ,header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: ADD_ITEM,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};

export const deleteItem = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/item/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    ).catch(err => console.log(err))

};
