import React, { Component, Fragment } from 'react';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import "../../invoice/create/FromTo.css"
import { connect } from 'react-redux';
import { getFromStorage, removeFromStorage, setInStorage } from "../../../storage"
import { Redirect } from 'react-router-dom'

const today = new Date();
const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

class NavBar extends Component {
    state = {
        id: {},
        des: [],
        visible: "",
        from: {}
    }


    inWords(num) {
        // if ((num = num.toString()).length > 9) return 'overflow';
        const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str;
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
        const add = getFromStorage("receipt").from

        this.setState({

            des: getFromStorage("receipt"),
            from: JSON.parse(add)
        })

    }
    render() {
        console.log((this.state.address), "this.state")
        return (


            <div className="printviewreceipt" style={{ height: 1410 }}>
                <div style={{height:625}}>
                <div className="row" style={{}}>

                    <div className="col-6"></div>
                    <div className="col-6" style={{ paddingLeft: 40, paddingTop: 30, }} >
                        <div className="row fontd">
                            <div className="col-5"> <p style={{ textAlign: "", marginTop: 110 }} > RC-{this.state.des.id} </p></div>
                            <div className="col-7"> <p className="" style={{ textAlign: "", marginTop: 110 }}> {this.convert(this.state.des.createdAt)} </p></div>
                            <div className="col-5"> <p className="" style={{ textAlign: "", marginTop: 18 }}>AK-{this.state.des.invoice_id} </p></div>
                            <div className="col-7"> <p className="" style={{ textAlign: "", marginTop: 18 }}>{parseInt(this.state.des.amount).toFixed(2)} </p></div>

                        </div>

                    </div>



                </div>



                <div className="" style={{ paddingTop: 0, paddingLeft: 20, height: 200 }}>

                    <div className="row fontd" style={{ height:30}}>

                        <div className="col-3"></div>
                        <div className="col-9">{this.state.from.name} | {this.state.from.nic} | {this.state.from.phonenumber}  </div>
                    </div> <div className="row fontd" style={{ paddingTop: 5, height:30 }}>
                        <div className="col-3"></div>
                        <div className="col-9">{this.state.des.for_payment_of}</div>
                    </div>
                    <div className="row fontd" style={{ paddingTop: 1, height:30 }}>

                        <div className="col-3"></div>
        <div className="col-9" style={{ paddingTop: 7, }}>  {this.inWords(this.state.des.amount)}</div>


                    </div>
                    <div className="row fontd" style={{ paddingTop: 10, height:30 }}>

                        <div className="col-5"></div>
                        <div className="col-7">  {this.state.des.payment_method} </div>


                    </div>
                    <div className="row fontd" style={{ paddingTop: 10, height:30 }}>

                        <div className="col-3"></div>
                        <div className="col-9" style={{ paddingTop: 7, }}>{this.state.des.remark} </div>


                    </div>



                </div>



                </div>
                <div className="row" style={{}}>

                    <div className="col-6"></div>
                    <div className="col-6" style={{ paddingLeft: 40, paddingTop: 30, }} >
                        <div className="row fontd">
                            <div className="col-5"> <p style={{ textAlign: "", marginTop: 110 }} > RC-{this.state.des.id} </p></div>
                            <div className="col-7"> <p className="" style={{ textAlign: "", marginTop: 110 }}> {this.convert(this.state.des.createdAt)} </p></div>
                            <div className="col-5"> <p className="" style={{ textAlign: "", marginTop: 18 }}>AK-{this.state.des.invoice_id} </p></div>
                            <div className="col-7"> <p className="" style={{ textAlign: "", marginTop: 18 }}>{parseInt(this.state.des.amount).toFixed(2)} </p></div>

                        </div>

                    </div>



                </div>



                <div className="" style={{ paddingTop: 0, paddingLeft: 20, height: 200 }}>

                    <div className="row fontd" style={{ height:30}}>

                        <div className="col-3"></div>
                        <div className="col-9">{this.state.from.name} | {this.state.from.nic} | {this.state.from.phonenumber}  </div>
                    </div> <div className="row fontd" style={{ paddingTop: 5, height:30 }}>
                        <div className="col-3"></div>
                        <div className="col-9">{this.state.des.for_payment_of}</div>
                    </div>
                    <div className="row fontd" style={{ paddingTop: 1, height:30 }}>

                        <div className="col-3"></div>
                        <div className="col-9" style={{ paddingTop: 7, }}> {this.inWords(this.state.des.amount)} </div>


                    </div>
                    <div className="row fontd" style={{ paddingTop: 10, height:30 }}>

                        <div className="col-5"></div>
                        <div className="col-7">  {this.state.des.payment_method} </div>


                    </div>
                    <div className="row fontd" style={{ paddingTop: 10, height:30 }}>

                        <div className="col-3"></div>
                        <div className="col-9" style={{ paddingTop: 7, }}>{this.state.des.remark} </div>


                    </div>



                </div>



                {/* <button onClick={window.print(), window.onafterprint = function () {

                    removeFromStorage("receipt");
                    // removeFromStorage("program");
                    window.location.replace("/app/invoice")
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