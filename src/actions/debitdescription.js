import { GET_DEBITDES,ADD_DEBITDES,DELETE_DEBITDES,UPDATE_DEBITDES,UPP_DEBITDES} from './type';
import axios from 'axios';
// import debit from 'src/views/debit';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"

export const getdebitdec = () => (dispatch,getState) => {

    axios.get('http://localhost:8080/debit_description/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: GET_DEBITDES,
            payload: res.data
        })
    ).catch(err => console.log(err))

};
export const getAdebitdec =(id)=>(dispatch,getState)=>{

    axios.get('http://localhost:8080/debit_description/' +id,header(getFromStorage("auth")))
        .then(data =>Response.json(data))
        .catch(err => console.log(err))
}
export const updatedebitdec = ( debit) => (dispatch,getState,) => {
    axios.post('http://localhost:8080/debit_description/' +debit.id,{
         
      debit_id:debit.debit_id,
     description:debit.description,
     amount:debit.amount,   
     },header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_DEBITDES,
            _id:debit.id,
           payload:debit
        })
    ).catch(err => console.log(err))

};

export const adddebitdec = (debit) => (dispatch,getState) => {
    console.log(debit,"debitoutpit")
    axios.post('http://localhost:8080/debit_description/add', debit,header(getFromStorage("auth")) ).then(res =>
        dispatch({
            type: ADD_DEBITDES,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};



export const deletedebitdec = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/debit_description/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_DEBITDES,
            payload: id
        })
    ).catch(err => console.log(err))

};


