import { GET_CUSTOMER,DELETE_CUSTOMER,ADD_CUSTOMER,UPDATE_CUSTOMER} from './type';
import axios from 'axios';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"
export const getCustomer = () => (dispatch,getState) => {
    axios.get('http://localhost:8080/customer/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type:GET_CUSTOMER,
            payload: res.data
        })
    ).catch(err => console.log(err))

};

export const addCustomer = (customer) => (dispatch,getState) => {
    axios.post('http://localhost:8080/customer/add', customer ,header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: ADD_CUSTOMER,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};

export const deleteCustomer = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/customer/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_CUSTOMER,
            payload: id
        })
    ).catch(err => console.log(err))

};
export const updateCustomer = (customer) => (dispatch,getState) => {
    axios.post('http://localhost:8080/customer/' + customer.id, {  customer_name:customer.customer_name,nic:customer.nic,phonenumber:customer.phonenumber,address:customer.address },header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_CUSTOMER,
            _id:customer.id,
            payload:customer,
        })
    ).catch(err => console.log(err))

};
export const getAcustomer = (id) => dispatch => {
    axios.get('http://localhost:8080/customer/' + id ,header(getFromStorage("auth"))).then(res =>
       {return(res.data)
     }
    ).catch(err => console.log(err))

};
