import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getRole } from '../../actions/owneraction';
import { connect } from 'react-redux';
import Create from './createrole.component';
import Update from './updaterole.component';
import { MDBDataTable } from 'mdbreact';

class ListRole extends Component {


    componentDidMount() {
        this.props.getRole()
    }

    render() {


        const userdata = this.props.role.map(role => {
            if (role.role.toLowerCase() === "admin" || role.role.toLowerCase() === "hr") {
                return {

                    role: role.role,

                    action: ""
                }
            }

            else {
                return {

                    role: role.role,

                    action: <Update id={role._id} />
                }
            }


        });

        const data = {
            columns: [
                {
                    label: 'Role',
                    field: 'role',

                    width: 450
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
            <div >
                {this.props.isauthendicate ?
                    <div >
                        <div className="mb-5">
                            <h2 className="addRoletitle justify-content-center" >Role Detailes</h2>
                        </div>
                        <div className="addRole" >
                            <Create />
                        </div>

                        <MDBDataTable
                            striped
                            hover
                            data={data}
                        />
                    </div>
                    : ""}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    role: state.role.role,
    isauthendicate: state.auth.isauthendicate

})
export default connect(mapStateToProps, { getRole })(ListRole);


