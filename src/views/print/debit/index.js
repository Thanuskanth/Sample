import React, { Component, Fragment } from 'react';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import "../../invoice/create/FromTo.css"
import { connect } from 'react-redux';
import { getFromStorage, removeFromStorage, setInStorage } from "../../../storage"
import { Redirect } from 'react-router-dom'
import { NoPrint } from 'react-easy-print';
import { red } from '@material-ui/core/colors';

const today = new Date();

class NavBar extends Component {
    state = {
        debit: [],
        debitdet: [],
        customer: [],
        visible: "",
        address: {},
        invoice: [],
        debit_total: 0,
        dis: ""
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    getTotal = () => {
        const totalval = this.state.des.reduce((count, { amount }) => count + amount, 0);
        return parseInt(totalval).toFixed(2);
    }
    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }
    componentDidMount() {

        this.setState({
            debit: getFromStorage("debitdet").debitnote,
            invoice: getFromStorage("debitdet").debitnote.invoice,
            debitdet: getFromStorage("debitdet").debitnote.debit_description,
            customer: getFromStorage("debitdet").customer,
            address: JSON.parse(getFromStorage("debitdet").customer.address)
        })

    }
    render() {
        console.log((this.state.address), "this.state")
        return (



            <div className="printviewdebit" style={{ height: 1420, backgroundColor: red }}>

                <div style={{ height: 635 }}>
                    <div className="row" >

                    <div className=" row col-6" style={{ paddingTop:  60, paddingLeft: 150, height: 100 }}>
                            <div className="col-12">Name: {this.state.customer.customer_name}</div>
                            <div className="col-12">NIC: {this.state.customer.nic}</div>
                            <div className="col-12">Phone: {this.state.customer.phonenumber}</div>
                            {/* <div className="col-12 row">
                                <div className="col-3">
                                    Address:
                                </div>
                                <div className="col-9">
                                    {this.state.address.no},<br />
                                    {this.state.address.area} ,
                                {this.state.address.city}
                                </div>




                            </div> */}


                        </div>



                        

                        <div className="col-6" style={{ paddingLeft: 60, paddingTop: 60, }} >
                            <div className="row fontd">
                                <div className="col-5"> <p style={{ textAlign: "" }} >DN-{this.state.debit.id} </p></div>
                                <div className="col-7"> <p className="" style={{ textAlign: "" }}> {this.convert(this.state.debit.createdAt)} </p></div>
                                <div className="col-5"> <p className="" style={{ textAlign: "", paddingTop: 15 }}>AK-{this.state.invoice.id} </p></div>
                                <div className="col-7"> <p className="" style={{ textAlign: "", paddingTop: 15 }}>{parseInt(this.state.debit.balance_due).toFixed(2)} </p></div>

                            </div>

                        </div>


                    </div>
                    <div style={{ paddingLeft: 145, paddingTop: 20, height: 140 }} >
                        {this.state.debitdet.map(data => {
                            return (
                                <div className="row " style={{ height: 20 }}>
                                    <div className="col-8 " >
                                        {data.description}
                                    </div>
                                    <div className="col-3" style={{ textAlign: "right", paddingRight: 70 }} >
                                        {parseInt(data.amount).toFixed(2)}
                                    </div>
                                    <div className="col-1" >

                                    </div>
                                </div>

                            )
                        })}

                    </div>

                    <div className="row " style={{}}>
                        <div className="col-8 " >

                        </div>
                        <div className="col-3" style={{ textAlign: "right", paddingRight: 70 }} >
                            {parseInt(this.state.debit.total).toFixed(2)}
                        </div>
                        <div className="col-1" >

                        </div>
                    </div>
                </div>
                <div style={{}}>
                    <div className="row" >

                        <div className=" row col-6" style={{ paddingTop: 50, paddingLeft: 150, height: 100 }}>
                            <div className="col-12">Name: {this.state.customer.customer_name}</div>
                            <div className="col-12">NIC: {this.state.customer.nic}</div>
                            <div className="col-12">Phone: {this.state.customer.phonenumber}</div>
                            {/* <div className="col-12 row">
                                <div className="col-3">
                                    Address:
                                </div>
                                <div className="col-9">
                                    {this.state.address.no},<br />
                                    {this.state.address.area} ,
                                {this.state.address.city}
                                </div>




                            </div>
 */}

                        </div>

                        <div className="col-6" style={{ paddingLeft: 50, paddingTop: 50, }} >
                            <div className="row fontd">
                                <div className="col-5"> <p style={{ textAlign: "" }} >DN-{this.state.debit.id} </p></div>
                                <div className="col-7"> <p className="" style={{ textAlign: "" }}> {this.convert(this.state.debit.createdAt)} </p></div>
                                <div className="col-5"> <p className="" style={{ textAlign: "", paddingTop: 15 }}>AK-{this.state.invoice.id} </p></div>
                                <div className="col-7"> <p className="" style={{ textAlign: "", paddingTop: 15 }}>{parseInt(this.state.debit.balance_due).toFixed(2)} </p></div>

                            </div>

                        </div>


                    </div>
                    <div style={{ paddingLeft: 145, paddingTop: 20, height: 140 }}  >
                        {this.state.debitdet.map(data => {
                            return (
                                <div className="row " style={{ height: 20 }}>
                                    <div className="col-8 " >
                                        {data.description}
                                    </div>
                                    <div className="col-3" style={{ textAlign: "right", paddingRight: 70 }} >
                                        {parseInt(data.amount).toFixed(2)}
                                    </div>
                                    <div className="col-1" >

                                    </div>
                                </div>

                            )
                        })}

                    </div>
                    <div className="row " style={{}}>
                        <div className="col-8 " >

                        </div>
                        <div className="col-3" style={{ textAlign: "right", paddingRight: 70 }} >
                            {parseInt(this.state.debit.total).toFixed(2)}
                        </div>
                        <div className="col-1" >

                        </div>
                    </div>
                </div>
                {/* <button onClick={window.print(), window.onafterprint = function () {

                    window.location.replace("/app/invoice")
                    removeFromStorage("debit");
                    removeFromStorage("debitdet");
                    removeFromStorage("debit_total");
                 
                }}>tk</button> */}
                <div className="row font" style={{ paddingTop: 20 }}>
                    <div className="col-9"></div>
                    {/* <div className="col-3">{parseInt(this.state.item.total).toFixed(2)}</div> */}
                </div>



            </div>

        )
    }
}
const mapstateToProps = (state) => ({
    auth: state.auth,
    curentinvoice: state.invoice.curentinvoice,
    curent: state.invoicedescription.curent,

})
export default connect(mapstateToProps, {})(NavBar);