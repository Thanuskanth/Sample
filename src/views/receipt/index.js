import React from 'react';

import './FromTo.css'
import DatePicker from "react-datepicker";
import { getPackage } from '../../actions/packageaction';
import { getProgram } from '../../actions/programaction';
import { getOwner } from '../../actions/owneraction'
import { addinvoice } from '../../actions/invoiceacttion'
import { addCustomer } from '../../actions/customeraction'
import { getinvoice, updateinvoice } from '../../actions/invoiceacttion'
import { connect } from 'react-redux';
import { removeFromStorage, setInStorage, getFromStorage } from "../../storage/index"
import { addinvoicedec, updateinvoicedec, } from '../../actions/itemdescription'
import { addreceipt, updatereceipt } from '../../actions/receiptaction'
 import Print from "../print/receipt/sample"
const today = new Date();

class FromTo extends React.PureComponent {
  componentDidMount() {

  }
  state = {
    amount: 0,
    payment_method: "CASH",
    remark: "",
    isprint: false,
    but: "GENERETE",
    no:"",
    area:"",
    city:"",
    name:"",
    nic:"",
    phone:"",
    for_payment_of:""
  }
  onchangeNo = (e) => {
    this.setState({
      no: e.target.value
    })
  }
  onchangefor_payment_of = (e) => {
    this.setState({
      for_payment_of: e.target.value
    })
  }
  onchangeArea = (e) => {
    this.setState({
      area: e.target.value
    })
  }
  onchangeCity = (e) => {
    this.setState({
      city: e.target.value
    })
  }
  onchangeName = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  onchangeNIC= (e) => {
    this.setState({
      nic: e.target.value
    })
  }
  onchangePhone = (e) => {
    this.setState({
      phone: e.target.value
    })
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

        invoice_id: this.props.id,
        for_payment_of: this.state.for_payment_of,
        amount: this.state.amount,
        from: JSON.stringify({ name: this.state.name, nic: this.state.nic, phonenumber: this.state.phonenumber ,address:{no:this.state.no,area:this.state.area,city:this.state.city}}),
        payment_method: this.state.payment_method,
        remark: this.state.remark,
      }
      //  setInStorage("receipt",receipt)
      this.props.addreceipt(receipt);
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
      for_payment_of: this.state.for_payment_of,
      amount: this.state.amount,
      from: JSON.stringify({ name: this.state.name, nic: this.state.nic, phonenumber: this.state.phonenumber ,address:{no:this.state.no,area:this.state.area,city:this.state.city}}),
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
    setInStorage("receipt",this.props.curent)

    return (
      <div className=''>

        <div className='page mb-4'>

          <div className="bill">
            <form onSubmit={this.onSubmitreceipt} >
              <div className='from-to mt-4'>

                <div className='from ' >



                  <div class="card mr-1" style={{ height: 120 }} >
                    <div class="card-header  " style={{ textAlign: "center" }}>PAYMENT METHOD</div>
                    <div class="card-body ">

                      <select class="custom-select customselect" disabled={this.state.isprint} required onChange={this.onChangePayment}>
                        <option value="CASH" > CASH</option>
                        <option value="CHEQUE">CHEQUE</option>


                      </select>

                    </div>
                  </div>






                  <div class="card  mt-2 mb-4"style={{ height: 430 }} >
                    <div class="card-header " >FROM</div>
                    <div class="card-body ">

                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                          <input type="text" required class="form-control datepica " disabled={this.state.isprint} onChange={this.onchangeName} placeholder="Enter Name" pattern="[a-zA-Z\s]{4,}" title="Letters only....,minimum 4 letters" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">NIC</label>
                        <div class="col-sm-10">
                          <input type="text" required class="form-control datepica" disabled={this.state.isprint} onChange={this.onchangeNIC} placeholder="Enter NIC EX:xxxxxxxxxV" pattern="[0-9]{9}[vV]{1}|[0-9]{12}[vV]{1}" title="xxxxxxxxxV" />
                        </div>
                      </div><div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Phone</label>
                        <div class="col-sm-10">
                          <input type="text" required class="form-control datepica" disabled={this.state.isprint} onChange={this.onchangePhone} placeholder="Enter Name EX:077-1234567"
                            pattern="[0-9]{3}-[0-9]{7,}" title="xxx-xxxxxxx" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Address</label>
                        <div class="col-sm-9">
                          <input type="text" required class=" form-group form-control datepica" disabled={this.state.isprint} onChange={this. onchangeNo} placeholder="226,main street" pattern="[0-9a-zA-Z/-,.\s]{5,}" title="Minimum 5 charecter and No special charecter only number letter and , " />
                          <input type="text" required class="form-group form-control datepica" disabled={this.state.isprint} onChange={this.onchangeArea} placeholder="nallur" pattern="[a-zA-Z/-,.\s,]{4,}" title="Letters only....,minimum 4 letters" />
                          <input type="text" required class="form-group form-control datepica" disabled={this.state.isprint} onChange={this.onchangeCity} placeholder="jaffna" pattern="[a-zA-Z/-.\s,]{4,}" title="Letters only....,minimum 4 letters" />
                        </div>
                      </div>








                    </div>
                  </div>
      <Print/>
                      {/* <button type="submit" class="btn btn-primary btn-lg generate btn-block" disabled={!this.state.isprint} >PRINT</button> */}
                </div>

                {/* right */}


                <div className='to'>

                  <div className="card-group  mb-2 ">

                    <div class="card  mr-1" >
                      <div class="card-header ">FOR PAYMENT OF</div>
                      <div class="card-body">
                        <input type="text" required class="form-control datepica " disabled={this.state.isprint} onChange={this.onchangefor_payment_of} style={{ textAlign: "center" }} placeholder="Enter FOR PAYMENT OF"  />


                      </div>
                    </div>
                  </div>
                  <div class="card mb-2" >
                    <div class="card-header  ">AMOUNT</div>
                    <div class="card-body">
                      <input type="number" disabled={this.state.isprint} required class="form-control datepica " style={{ textAlign: "center" }} onChange={this.onchangeAmount} placeholder="Enter Amount" />

                    </div>
                  </div>
                  <div className="card-group  mb-2">
                    <div class="card mr-1  " >
                      <div class="card-header  ">DATE</div>
                      <div class="card-body">
                        <p>{this.convert(today)}</p>

                        {/* <select class="custom-select customselect" required onChange={this.onChangePackage} disabled={this.state.disableGenerate}>
                              <option >{this.state.package}</option>

                              {this.props.package.map((pac) => (
                                <option value={pac.package_name}>{pac.package_name}</option>
                              )
                              )
                              }
                            </select> */}


                      </div>
                    </div>

                  </div>
                  <div class="card   " style={{ height: 170 ,marginBottom:28 }}>
                    <div class="card-header  ">NOTE</div>
                    <div class="card-body">

                      <textarea class="form-control" disabled={this.state.isprint} placeholder="Enter Note here ....." id="exampleFormControlTextarea1" rows="3" onChange={this.onchangeNote}></textarea>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary btn-lg generate btn-block"  >{this.state.but}</button>



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


})
export default connect(mapStateToProps, { addreceipt, updatereceipt })(FromTo);

