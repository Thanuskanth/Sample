import React from 'react';
import './create.css'
import { addreceipt, updatereceipt } from '../../actions/receiptaction'
import { connect } from 'react-redux';
import { getFromStorage, setInStorage } from "../../storage/index"
import { header } from '../../actions/authaction';
import axios from 'axios';
import { getBALANCE, updateBALANCE } from '../../actions/balanceaction';
import { getreceipt } from '../../actions/receiptaction';

const today = new Date();


class FromTo extends React.PureComponent {
    componentDidMount() {
           axios.get('http://localhost:8080/receipt/receipt/' + this.props.id, header(getFromStorage("auth"))).then(res => {
            setInStorage("receipt",res.data)

            this.setState({

                receipt: res.data,
                from: JSON.parse(res.data.from)

            })
        })


    }

    getTotal = () => {

        const receipt = this.props.receipt.filter(x => x.invoice_id == this.props.id).reduce((count, { amount }) => count + parseInt(amount), 0)
        const debit = this.state.invoice.debit.reduce((count, { total }) => count + parseInt(total), 0);

        return parseInt(this.state.invoice.total) - (parseInt(receipt) + parseInt(debit));

    }
    getbalance() {
        return this.props.balance.filter(x => x.invoice_id == this.props.id).map(x => {
            this.setState({
                debitamount: x.amount,
                id: x.id
            })
        })
    }
    state = {
        receipt: {},
        from: {},
        amount: 0,
        payment_method: "CASH",
        remark: "",
        isprint: false,
        but: "GENERETE",
        debitamount: 0
    }
    onchangeAmount = (e) => {
        this.setState({
            amount: e.target.value
        })
    }
    onChangePayment = (e) => {
        this.setState({
            payment_method: e.target.value
        })
    }
    onchangeNote = (e) => {
        this.setState({
            remark: e.target.value
        })
    }

    onSubmitreceipt = (e) => {
        if (this.state.but == "GENERETE") {
            e.preventDefault();
            const receipt = {

                invoice_id: this.state.invoice.id,
                for_payment_of: this.state.invoice.order_id,
                amount: this.state.amount,
                from: JSON.stringify({ name: this.state.invoice.customer_name, nic: this.state.invoice.nic, phonenumber: this.state.invoice.phonenumber }),
                payment_method: this.state.payment_method,
                remark: this.state.remark,
            }
            // setInStorage("receipt",receipt)
            this.props.addreceipt(receipt);
            const newamount = {
                id: this.state.id,
                amount: this.state.debitamount - this.state.amount

            }
            this.props.updateBALANCE(newamount)

            this.setState({
                but: "EDIT",
                isprint: !this.state.isprint
            })
        }
        else if (this.state.but == "UPDATE") {
            this.onSubmitUpdatereceipt(e);
        }
        else if (this.state.but == "EDIT") {
            e.preventDefault();
            this.setState({
                but: "UPDATE",
                isprint: !this.state.isprint
            })
        }

    }
    onSubmitUpdatereceipt = (e) => {
        e.preventDefault();
        const receipt = {
            id: this.props.curent.id,
            invoice_id: this.state.invoice.id,
            for_payment_of: this.state.invoice.order_id,
            amount: this.state.amount,
            from: JSON.stringify({ name: this.state.invoice.customer_name, nic: this.state.invoice.nic, phonenumber: this.state.invoice.phonenumber }),
            payment_method: this.state.payment_method,
            remark: this.state.remark,
        }
        // setInStorage("receipt",receipt)

        this.props.updatereceipt(receipt);
        this.setState({
            but: "EDIT",
            isprint: !this.state.isprint
        })
    }
    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }
    render() {
        this.getbalance()

        // setInStorage("receipt", this.props.curent)
        

        console.log(this.state, " this.props.receipt.filter(x=>x.id==this.props.id)")
        return (
            <div className='App'>

                <div className='page mb-4'>

                    <div className="bill">
                        <form onSubmit={this.onSubmitreceipt} >
                            <div className='from-to mt-4'>

                                <div className='from ' >


                                    <div class="card mr-1 mb-2" style={{ height: 120 }} >
                                        <div class="card-header  " style={{ textAlign: "center" }}>INVOICE NO</div>
                                        <div class="card-body ">
                                            <p style={{ textAlign: "center" }}>AK-{this.state.receipt.invoice_id}</p>


                                        </div>
                                    </div>



                                    <div class="card mr-1 mb-2" style={{ height: 120, textAlign: "center" }} >
                                        <div class="card-header  ">DATE</div>
                                        <div class="card-body" >
                                            <p style={{ textAlign: "center" }}>{this.convert(this.state.receipt.createdAt)}</p>

                                        </div>
                                    </div>






                                    <div class="card  mt-2 " style={{ height: 280 }} >
                                        <div class="card-header ">FROM</div>
                                        <div class="card-body ">

                                            <div class="form-group row">
                                                <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                                                <div class="col-sm-10">
                                                    <input type="text" required class="form-control datepica " disabled value={this.state.from.name} />
                                                </div>
                                            </div>
                                            <div class="form-group row">
                                                <label for="staticEmail" class="col-sm-2 col-form-label">NIC</label>
                                                <div class="col-sm-10">
                                                    <input type="text" required class="form-control datepica" disabled value={this.state.from.nic} />
                                                </div>
                                            </div><div class="form-group row">
                                                <label for="staticEmail" class="col-sm-2 col-form-label">Phone</label>
                                                <div class="col-sm-10">
                                                    <input type="text" required class="form-control datepica" disabled value={this.state.from.phonenumber} />
                                                </div>
                                            </div>
                                            {/* <div class="form-group row">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Address</label>
                        <div class="col-sm-9">
                          <input type="text" required class=" form-group form-control datepica" disabled value={this.state.address.no} />
                          <input type="text" required class="form-group form-control datepica" disabled value={this.state.address.area} />
                          <input type="text" required class="form-group form-control datepica" disabled value={this.state.address.city} />
                        </div>
                      </div> */}








                                        </div>
                                    </div>

                                </div>

                                {/* right */}


                                <div className='to'>

                                    <div className="card-group  mb-2 ">

                                        <div class="card  mr-1" >
                                            <div class="card-header ">FOR PAYMENT OF</div>
                                            <div class="card-body">
                                                <p>{this.state.receipt.for_payment_of}</p>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="card mb-2" >
                                        <div class="card-header  ">AMOUNT</div>
                                        <div class="card-body">
                                            {/* <input type="number" disabled={this.state.isprint} required class="form-control datepica " style={{ textAlign: "center" }} onChange={this.onchangeAmount} placeholder="Enter Amount" pattern="[0-9]{1,}" title="Letters only....,minimum 4 letters" /> */}
                                            <p>{this.state.receipt.amount}</p>
                                        </div>
                                    </div>
                                    <div class="card mb-2"  >
                                        <div class="card-header" style={{ textAlign: "center" }}>PAYMENT METHOD</div>
                                        <div class="card-body ">
                                            <p>{this.state.receipt.payment_method}</p>

                                            {/* 

                      <select class="custom-select customselect" disabled={this.state.isprint} required onChange={this.onChangePayment}>
                        <option value="CASH" > CASH</option>
                        <option value="CHEQUE">CHEQUE</option>


                      </select> */}



                                        </div>
                                    </div>
                                    <div class="card mb-4  " style={{ height: 150 }}>
                                        <div class="card-header  ">NOTE</div>
                                        <div class="card-body">
                                            {/* <textarea class="form-control" disabled={this.state.isprint} placeholder="Enter Note here ....." id="exampleFormControlTextarea1" rows="3" onChange={this.onchangeNote}></textarea> */}
                                            <p>{this.state.receipt.remark}</p>
                                            {/* <input type="text" required class="form-control datepica " disabled={this.state.disableGenerate} onChange={this.onChangename} placeholder="Enter Name" pattern="[a-zA-Z\s]{4,}" title="Letters only....,minimum 4 letters" /> */}
                                        </div>
                                    </div>

                                    {/* <button type="submit" class="btn btn-primary btn-lg generate btn-block" style={{ marginBottom: 20 }} >{this.state.but}</button> */}
                                    <a href="/print_receipt">  <button type="button" class="btn MT-2 btn-primary btn-lg generate btn-block"  > PRINT</button></a>



                                </div>

                            </div>
                        </form >
                    </div>

                </div>

            </div>

        );
    }
}
const mapStateToProps = (state) => ({

    curent: state.receipt.curent,
    iscurent: state.receipt.iscurent,
    balance: state.balance.balance,
    receipt: state.receipt.receipt


})
export default connect(mapStateToProps, { updateBALANCE, addreceipt, updatereceipt, getBALANCE, getreceipt })(FromTo);

