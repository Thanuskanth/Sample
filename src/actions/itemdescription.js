import { GET_INVOICEDESC,ADD_INVOICEDESC,DELETE_INVOICEDESC,UPDATE_INVOICEDESC,UPP_INVOICEDESC ,DELETE_UPDATEIN} from './type';
import axios from 'axios';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"

export const getinvoicedec = () => (dispatch,getState) => {

    axios.get('http://localhost:8080/description/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: GET_INVOICEDESC,
            payload: res.data
        })
    ).catch(err => console.log(err))

};
export const getAinvoicedec =(id)=>(dispatch,getState)=>{

    axios.get('http://localhost:8080/description/' +id,header(getFromStorage("auth")))
        .then(data =>Response.json(data))
        .catch(err => console.log(err))
}
export const updateinvoicedec = ( invoice) => (dispatch,getState,) => {
    axios.post('http://localhost:8080/description/' +invoice.id,{
         
     total:invoice.total,
     description:invoice.description,
     amount:invoice.amount,
     service:invoice.service,
     count:invoice.count,
    },header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_INVOICEDESC,
            _id:invoice.id,
           payload:invoice
        })
    ).catch(err => console.log(err))

};

export const addinvoicedec = (invoice) => (dispatch,getState) => {
    console.log(invoice,"invoiceoutpit")
    axios.post('http://localhost:8080/description/add', invoice,header(getFromStorage("auth")) ).then(res =>
        dispatch({
            type: ADD_INVOICEDESC,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};


export const adddisc = (invoice) => (dispatch,getState) => {
   

        dispatch({
            type: UPP_INVOICEDESC,
            payload: invoice,
        })
   

};

export const deleteinvoicedec = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/description/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_INVOICEDESC,
            payload: id
        })
    ).catch(err => console.log(err))

};


