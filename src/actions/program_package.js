import { GET_PROPAC,ADD_PROPAC,DELETE_PROPAC,UPDATE_PROPAC } from './type';
import axios from 'axios';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"

export const getpropac = () => (dispatch,getState) => {

    axios.get('http://localhost:8080/program_package/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: GET_PROPAC,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};
export const getApropac=(id)=>(dispatch,getState)=>{

    axios.get('http://localhost:8080/program_package/' +id,header(getFromStorage("auth")))
        .then(data =>Response.json(data))
        .catch(err => console.log(err))
}
export const updatepropac = (id, invoice) => (dispatch,getState,) => {
    axios.post('http://localhost:8080/program_package/' +id,{
    packageId:invoice.packageId,
    ownerId:invoice.ownerId,
    programId:invoice.programId,
     order_id:invoice.order_id,
     amount:invoice.amount,
     items:invoice.items,
     service:invoice.service,
     
},header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_PROPAC,
            _id:id,
           payload:res.data
        })
    ).catch(err => console.log(err))

};

export const addpropac= (invoice) => (dispatch,getState) => {
    console.log(invoice,"invoiceoutpit")
    axios.post('http://localhost:8080/program_package/add', invoice ,header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: ADD_PROPAC,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};

export const deletepropac = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/program_package/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_PROPAC,
            payload: id
        })
    ).catch(err => console.log(err))

};
