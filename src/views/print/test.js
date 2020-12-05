import React, { Component, Fragment } from 'react';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import "../invoice/create/src/FromTo.css"
import { connect } from 'react-redux';
import { getFromStorage, removeFromStorage, setInStorage } from "../../storage"
import { Redirect } from 'react-router-dom'
import { red } from '@material-ui/core/colors';

const today = new Date();

class NavBar extends Component {
    state = {
        item: {},
        des: [],
        visible: ""
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    getTotal = () => {
        const totalval = this.state.des.reduce((count, { total_amo }) => count + total_amo, 0);
        return parseInt(totalval + this.state.item.total).toFixed(2);
    }
    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }
    componentDidMount() {
        window.print()

    }
    render() {

        console.log(this.state, "this.state")
        return (


            <div className="printviewtest" style={{ height: 1400 }}>
                <div className="row">
                    <div className="col-6" style={{ paddingTop: 250, paddingLeft: 160, height: 200 }}>

                        <div className="row" style={{}}>
                            <div className="col-12">samplasaasasasaaaasasa<br />

                            </div>
                            <div className="col-5">
                                7894561230254
                                789654123025

                            </div>
                            <div className="col-7">
                                789456123456789


                            </div>
                        </div>



                    </div>

                    <div className="col-6" style={{ paddingLeft: 50 }} >
                        <div className="row" style={{ paddingRight: 30 }}>
                            <div className="col-5" > <p style={{ textAlign: "", marginTop: 140 }} >AK-ddd </p></div>
                            <div className="col-7" > <p className="" style={{ textAlign: "", marginTop: 140 }}> 20.02.32102 </p></div>

                            <div className="col-12" > <p className="" style={{ textAlign: "", marginTop: 30 }}>ssssssddddds </p></div>
                            <div className="col-5" > <p style={{ textAlign: "", marginTop: 30 }} >ssssssssssss</p></div>

                            <div className="col-7" > <p className="" style={{ textAlign: "", marginTop: 30 }}> 12.02.32012</p></div>
                            <div className="col-12" > <p className="" style={{ textAlign: "", marginTop: 30 }}>ssssssssssssssssssssss </p></div>

                        </div>

                    </div>


                </div>

                <div className="" style={{ paddingTop: 60, paddingLeft: 150, height: 450 }}>
                    <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div>
                    {/* {this.state.des.map(data => {
                        return (<div className=" row col-12" >   <div className="col-10">{data.detail}</div>
                            <div className="col-2" style={{ paddingRight: 50, textAlign: "right" }}>{parseInt(data.amount).toFixed(2)}</div>
                        </div>
                        )
                    })} */}
                    <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div>
                    <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div>
                    <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div>
                    <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div>
                     <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div> <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div> <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div> <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div> <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div> <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div> <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div> <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div> <div className=" row " >
                        <div className="col-6" >ddddddddddddddddd</div>
                        <div className="col-4" style={{ textAlign: "right" }}>12302222</div>
                        <div className="col-2" ></div>
                    </div>
                </div>

                <button onClick={window.print(), window.onafterprint = function () {

                    removeFromStorage("items");
                    removeFromStorage("program");
                    window.location.replace("/")
                }}>tk</button>
                <div className="row" style={{  paddingLeft: 100,paddingTop:10 }}>
                    <div className="col-9"></div>
                    <div className="col-3">{(this.getTotal())}</div>
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