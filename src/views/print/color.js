import React, { Component, Fragment } from 'react';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import "../invoice/create/FromTo.css"
import { connect } from 'react-redux';
import { getFromStorage, removeFromStorage, setInStorage } from "../../storage"
import { Redirect } from 'react-router-dom'

const today = new Date();

class NavBar extends Component {
    state = {
        item: {},
        des: [],
        visible: "",
        address: {},
        invoice: {},
        customer: [],
        owners: [],
        program: [],
        package: [],
        description: [],

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
        const add = getFromStorage("program").customers
        const data =
            getFromStorage("program").invoice_description.map(data => {
                return {
                    description: JSON.parse(data.description),
                    service: JSON.parse(data.service),
                    amount: (data.amount),
                    count: (data.count),
                }
            }
            )
        this.setState({
            customer: getFromStorage("program").customers,
            owners: getFromStorage("program").owners,
            program: getFromStorage("program").programs,
            package: getFromStorage("program").packages,
            invoice: getFromStorage("program"),

            // // item: getFromStorage("program"),
            description: data,

            address: JSON.parse(add.address)
        })

    }
    render() {
        console.log((this.state.address), "this.state")
        return (


            <div className="printview" style={{ height: 1400 }}>
                <div className="row">
                    <div className="col-6" style={{ paddingTop: 240, paddingLeft: 160, height: 200 }}>

                    <div className="row fontd" style={{}}>
                            <div className="col-12" style={{ height: 22 }}>Name: {this.state.customer.customer_name}</div>
                            <div className="col-12" style={{ height: 22 }}>NIC: {this.state.customer.nic}</div>
                            <div className="col-12" style={{ height: 22 }}>Phone: {this.state.customer.phonenumber}</div>
                            <div className="col-12 row">
                                <div className="col-3">
                                    Address:
                                </div>
                                <div className="col-9 row" style={{paddingLeft:5 }} >
                                    <div className="col-12" style={{ height: 20 }} >
                                        {(this.state.address.no)},
                                    </div>
                                    <div className="col-12" style={{ height: 20 }}  >
                                        {this.state.address.area} ,

                                    </div>
                                    <div className="col-12" style={{ height: 20 }}  >

                                        {this.state.address.city}.
                                    </div>
                                </div>




                            </div>

                        </div>



                    </div>

                    <div className="col-6" style={{ paddingLeft: 40, paddingTop: 30, height: 370 }} >
                        <div className="row fontd">
                            <div className="col-5"> <p style={{ textAlign: "", marginTop: 110 }} >{this.state.owners.tag}-{this.state.invoice.id} </p></div>
                            <div className="col-7"> <p className="" style={{ textAlign: "", marginTop: 110 }}> {this.convert(today)} </p></div>
                            <div className="col-12"> <p className="" style={{ textAlign: "", marginTop: 25 }}>{this.state.program.program_name} </p></div>
                            <div className="col-5"> <p style={{ textAlign: "", marginTop: 25 }} >{this.state.package.package_name} </p></div>
                            <div className="col-7"> <p className="" style={{ textAlign: "", marginTop: 25 }}> {this.convert(this.state.invoice.date)}</p></div>
                            <div className="col-10"> <p className="" style={{ textAlign: "", marginTop: 22 }}>{this.state.invoice.order_id} </p></div>
                            <div className="col-2"> <p className="" style={{ textAlign: "", marginTop: 22 }}> </p></div>

                        </div>

                    </div>


                </div>

                <div className="font" style={{ paddingTop: 60, paddingLeft: 150, height: 450 }}>
                    {/* <div className=" row col-12" >
                           <div className="col-10" >{this.state.item.program} {this.state.item.package}</div>
                        <div className="col-2" style={{ paddingRight: 50, textAlign: "right" }}>{parseInt(this.state.item.total).toFixed(2)}</div>
                    </div> */}


                    <div className=" row " >



                        {this.state.description.map(data => {
                            return (<>

                                <div className="col-5" >





                                    <div class="row ">
                                        <div class=" col-10" style={{ textAlign: "left" }}>

                                            <b> {data.description.description}</b>


                                        </div>
                                    </div>
                                    {
                                        Object.keys(data.description.items).length > 0 ?
                                            <div class="row mt-1 mb-1">
                                                <div className="col-2" >

                                                </div>
                                                <div className="col-4" >

                                                    <b>ITEMS</b>
                                                </div>
                                                <div className="col-6" >

                                                </div>
                                            </div> : ""

                                    }

                                    {data.description.items.map(d => {
                                        return <div class="row">
                                            <div class=" col-1">

                                            </div>
                                            <div class=" col-6" style={{ textAlign: "left" }}>

                                                {d.item}


                                            </div>
                                            <div class=" col-4" style={{ textAlign: "left" }}>

                                                {d.detail}


                                            </div>
                                            <div class=" col-1" style={{ textAlign: "left" }}>

                                                {d.status}


                                            </div>
                                        </div>
                                    })}

                                    {
                                        Object.keys(data.service).length > 0 ?
                                            <div class="row mt-1 mb-1">
                                                <div className="col-2" >

                                                </div>
                                                <div className="col-4" >

                                                    <b>SERVICE</b>
                                                </div>
                                                <div className="col-6" >

                                                </div>
                                            </div> : ""

                                    }

                                    {data.service.map(d => {
                                        return <div div class="row" >
                                            <div class=" col-1">

                                            </div>
                                            <div class=" col-7" style={{ textAlign: "left" }}>

                                                {d.service}


                                            </div>
                                            <div class=" col-3" style={{ textAlign: "left" }}>




                                            </div>
                                            <div class=" col-1" style={{ textAlign: "left" }}>

                                                {d.detail}


                                            </div>

                                        </div>
                                    })}









                                </div>

                                <div className="col-1" >{data.count}</div>

                                <div className="col-4" style={{ textAlign: "right" }}>{parseInt(data.amount).toFixed(2)}</div>
                                <div className="col-2" ></div>
                            </>
                            )

                        })}

                    </div>
                </div>

                {/* <button
                 onClick={
                    window.print(), window.onafterprint = function () {

                    removeFromStorage("items");
                    removeFromStorage("program");
                    window.location.replace("/app/invoice")
                }}>tk</button> */}
                <div className="row font" style={{ paddingTop: 20 }}>
                    <div className="col-9"></div>
                    <div className="col-3">{parseInt(this.state.invoice.total).toFixed(2)}</div>
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