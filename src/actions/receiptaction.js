import { GET_RECEIPT,DELETE_RECEIPT,ADD_RECEIPT,UPDATE_RECEIPT} from './type';
import axios from 'axios';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"
export const getreceipt = () => (dispatch,getState) => {
    axios.get('http://localhost:8080/receipt/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type:GET_RECEIPT,
            payload: res.data
        })
    ).catch(err => console.log(err))

};

export const addreceipt = (receipt) => (dispatch,getState) => {
    axios.post('http://localhost:8080/receipt/add', receipt ,header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: ADD_RECEIPT,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};

export const deletereceipt = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/receipt/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_RECEIPT,
            payload: id
        })
    ).catch(err => console.log(err))

};
export const updatereceipt = (receipt) => (dispatch,getState) => {
    
    axios.post('http://localhost:8080/receipt/' + receipt.id, {  
        invoice_id:receipt.invoice_id,for_payment_of: receipt.for_payment_of,amount: receipt.amount,from: receipt.from,payment_method : receipt.payment_method,remark: receipt.remark
     },header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_RECEIPT,
            _id:receipt.id,
            payload:receipt,
        })
    ).catch(err => console.log(err))

};
export const getAreceipt = (id) => dispatch => {
    axios.get('http://localhost:8080/receipt/' + id ,header(getFromStorage("auth"))).then(res =>
       {return(res.data)
     }
    ).catch(err => console.log(err))

};
