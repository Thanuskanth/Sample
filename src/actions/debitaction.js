import { GET_DEBIT,ADD_DEBIT,DELETE_DEBIT,UPDATE_DEBIT,UPP_DEBIT ,DELETE_UPDATEIN,DELETE_DEBITCUR} from './type';
import axios from 'axios';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"

export const getdebit = () => (dispatch,getState) => {

    axios.get('http://localhost:8080/debit/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: GET_DEBIT,
            payload: res.data
        })
    ).catch(err => console.log(err))

};
export const getAdebit =(id)=>(dispatch,getState)=>{

    axios.get('http://localhost:8080/debit/' +id,header(getFromStorage("auth")))
        .then(data =>Response.json(data))
        .catch(err => console.log(err))
}
export const updatedebit = ( invoice) => (dispatch,getState,) => {
    axios.post('http://localhost:8080/debit/' +invoice.id,{
         
      invoice_id:invoice.invoice_id,
     balance_due:invoice.balance_due,
     total:invoice.total,   
     },header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_DEBIT,
            _id:invoice.id,
           payload:invoice
        })
    ).catch(err => console.log(err))

};

export const adddebit = (invoice) => (dispatch,getState) => {
    console.log(invoice,"invoiceoutpit")
    axios.post('http://localhost:8080/debit/add', invoice,header(getFromStorage("auth")) ).then(res =>
        dispatch({
            type: ADD_DEBIT,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};

export const deletedebit = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/debit/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_DEBIT,
            payload: id
        })
    ).catch(err => console.log(err))

};

export const deletedebitcurent = () => (dispatch,getState) => {

        dispatch({
            type: DELETE_DEBITCUR,
           
        })
  

};


