import React from 'react';
import './create.css'
import { addreceipt, updatereceipt } from '../../../actions/receiptaction'
import { connect } from 'react-redux';
import { getFromStorage, setInStorage } from "../../../storage/index"
import { header } from '../../../actions/authaction';
import axios from 'axios';
import { getreceipt } from '../../../actions/receiptaction';
import Print from '../../print/receipt/sample';

const today = new Date();


class FromTo extends React.PureComponent {
    componentDidMount() {
        axios.get('http://localhost:8080/receipt/receipt/' + this.props.id, header(getFromStorage("auth"))).then(res => {
            setInStorage("receipt", res.data)

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
    
   
    
    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }
    render() {



        return (
            <div className='App'>

                <div className='page mb-4'>

                    <div className="bill">
                        <form onSubmit={this.onSubmitinvoicedec} >
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
                                            <p>{this.state.receipt.amount}</p>
                                        </div>
                                    </div>
                                    <div class="card mb-2"  >
                                        <div class="card-header" style={{ textAlign: "center" }}>PAYMENT METHOD</div>
                                        <div class="card-body ">
                                            <p>{this.state.receipt.payment_method}</p>





                                        </div>
                                    </div>
                                    <div class="card mb-4  " style={{ height: 150 }}>
                                        <div class="card-header  ">NOTE</div>
                                        <div class="card-body">
                                            <p>{this.state.receipt.remark}</p>
                                        </div>
                                    </div>


                                    <Print />

                                </div>

                            </div>
                        </form >
                    </div>

                </div>S

            </div>

        );
    }
}
const mapStateToProps = (state) => ({

    curent: state.receipt.curent,
    iscurent: state.receipt.iscurent,
    receipt: state.receipt.receipt


})
export default connect(mapStateToProps, { addreceipt, updatereceipt, getreceipt })(FromTo);

