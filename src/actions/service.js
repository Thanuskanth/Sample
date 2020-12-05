import { GET_SERVICE,ADD_SERVICE,DELETE_SERVICE,UPDATE_SERVICE } from './type';
import axios from 'axios';
import {header} from './authaction';
import{getFromStorage}from "../storage/index"

export const getservice = () => (dispatch,getState) => {

    axios.get('http://localhost:8080/service/',header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: GET_SERVICE,
            payload: res.data
        })
    ).catch(err => console.log(err))

};
export const getAservice =(id)=>(dispatch,getState)=>{

    axios.get('http://localhost:8080/service/' +id,header(getFromStorage("auth")))
        .then(data =>Response.json(data))
        .catch(err => console.log(err))
}
export const updateservice = ( service) => (dispatch,getState,) => {
    axios.post('http://localhost:8080/service/' +service.id,{
         
    
     service:service.service,
     
    
    },header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_SERVICE,
            _id:service.id,
           payload:service
        })
    ).catch(err => console.log(err))

};

export const addservice = (service) => (dispatch,getState) => {
    console.log(service,"serviceoutpit")
    axios.post('http://localhost:8080/service/add', service,header(getFromStorage("auth")) ).then(res =>
        dispatch({
            type: ADD_SERVICE,
            payload: res.data,
        })
    ).catch(err => console.log(err))

};




export const deleteservice = (id) => (dispatch,getState) => {

    axios.delete('http://localhost:8080/service/'+id,header(getFromStorage("auth"))).then(() =>
        dispatch({
            type: DELETE_SERVICE,
            payload: id
        })
    ).catch(err => console.log(err))

};


