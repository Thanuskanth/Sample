import axios from 'axios';
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    UPDATE_USER,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADING,
    USER_LODED
} from './type';
import {getError} from "./erroraction";
import{ removeFromStorage,setInStorage,getFromStorage} from "../storage/index"
export const header =(token)=>{
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token.token;
    }
    return config;
}


export const userloading = () => (dispatch, setstate) => {
    dispatch({ type: USER_LOADING });
    const token = setstate().auth.token;
    // localStorage.setItem("token",token);
    const config = {
        header: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.header['x-auth-token'] = token;
    }
    axios.get('http://localhost:8080/auth/user', config).then(res=>{
        dispatch({
            type: USER_LODED,
            payload: res.data
        })
    }).catch(err => {
        removeFromStorage("auth")
        setInStorage("isauthendicate",false);
        console.log(err.response)
        dispatch(getError(err.response.data,err.response.status))
       
    })
 

}
export const register = (user) => dispatch => {
    dispatch({ type: USER_LOADING });
    
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    const body=JSON.stringify(user);

    
    axios.post('http://localhost:8080/user/add',user, config).then(res=>{
        setInStorage("isauthendicate",true);

        setInStorage("auth",res.data)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
       getError(err.response.data,err.response.status,"register_err")
        removeFromStorage("auth")
        setInStorage("isauthendicate",true);

        dispatch({ type: REGISTER_FAIL })
    })


}
export const logout =()=>dispatch=>{
    removeFromStorage("auth")
    setInStorage("isauthendicate",false);

dispatch({
    type:LOGOUT_SUCCESS
})
}
export const login = (user) => dispatch => {

    dispatch({ type: USER_LOADING });
    
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    const body=JSON.stringify(user);
    console.log('this is user',user)
    
    axios.post('http://localhost:8080/auth/login',user).then(res=>{
        setInStorage("isauthendicate",true);

        setInStorage("auth",res.data)
        // console.log(getFromStorage("auth").token,"localstoretoken")
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        console.log(err)

        dispatch( getError(err.response.data,err.response.status,"login_error"))
        removeFromStorage("auth")
        setInStorage("isauthendicate",false);

        dispatch({ type: LOGIN_FAIL })
    })


}
export const updatepassword = (id, password) => (dispatch, getState) => {
    axios.post('http://localhost:8080/user/password/' + id, password, header(getFromStorage("auth"))).then(
        dispatch(getError("password changed", null, "pwd_success"))

    ).catch(err => { dispatch(getError(err.response.data, err.response.status, "password_change")) }
    )

};
export const updateuser = (id, user) => (dispatch, getState) => {
    axios.post('http://localhost:8080/user/' + id, user, header(getFromStorage("auth"))).then(res =>
        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
        
    )
        .catch(err => 
            
            // { 
                console.log(err,"sdsdsdsssss")
                // dispatch(getError(err.response.data, err.response.status, "updateuser_error")) }
            )

}; 