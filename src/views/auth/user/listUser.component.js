import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import Create from './createuser.component';
import {getUser} from '../../actions/useractions';
import {getArole} from '../../actions/roleaction';
import Update from './updateuser.componenant';

class Listuser extends Component {
componentDidMount(){
    this.props.getUser();
}

    render() {

const userdata=this.props.user.user.map(user=>
    {
      
        return{
            name:user.username,
            email:user.email,
            role:user.role.role,
            
            action:<Update id={user._id}/>
        }
    
});

        const data = {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                   
                    width: 150
                },
                {
                    label: 'Email',
                    field: 'email',
                    
                    width: 270
                },
                {
                    label: 'Role',
                    field: 'role',
                    
                    width: 200
                },
                {
                    label: 'Action',
                    field: 'action',
                    
                    width: 200
                }


            ],
            rows: 
                userdata
                
        };


        return (
            <div   >
            {this.props.isauthendicate ?
           
            <div   >
                <div  className="mb-5">
                <h2 className="addRoletitle justify-content-center" >User Details</h2>
                <div className="addRole" >
                <Create />
                </div>
                </div>
                <MDBDataTable
                    striped
                    hover
                    data={data}
                />
            </div>
            :""}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, {getUser,getArole})(Listuser);
