import React from 'react';

import './FromTo.css'
import {getAinvoice} from '../../../actions/invoiceacttion';
import{getFromStorage,setInStorage}from "../../../storage"

import { connect } from 'react-redux';
import image from "./logo.PNG"
import {header} from '../../../actions/authaction'; 
import {getreceipt} from '../../../actions/receiptaction'; 
import axios from 'axios';
import {adddebit,getdebit} from '../../../actions/debitaction'; 
import {adddebitdec} from '../../../actions/debitdescription'; 
class FromTo extends React.PureComponent {
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
getbalance(){
 return this.props.balance.filter(x=>x.invoice_id==this.props.id).map(x=>{
   this.setState({
     amount:x.amount
   })
 })
}

getbalance(){
  return this.props.balance.filter(x=>x.invoice_id==this.props.id).map(x=>{
    this.setState({
      amount:x.amount
    })
  })
 }
onSubmitinvoicedec = (e) => {
  e.preventDefault();


  const debitdata= {
    invoiceId: this.props.id,
    balance_due: this.getTotal(),
    total: 0,
    
  }
  
  this.props.adddebit(debitdata);
 
  this.setState({
    gen:true,
    id:this.props.curent.id
  })

 
}

  componentDidMount() {
    this.props.getreceipt();
      axios.get('http://localhost:8080/invoice/' + this.props.id, header(getFromStorage("auth"))).then(res => {
      console.log(res.data, "fffffffffffffffffff")
      this.setState({

        invoice: res.data,
        customer: res.data.customers,
        address:JSON.parse(res.data.customers.address)

      })
    })
      // setInStorage("program",res.data);
  

  
  }
  getTotal = () => {
// if(this.state.invoice.size != 0){alert("yes")}else{alert("no")}
    const receipt=  this.props.receipt.filter(x=>x.invoice_id==this.props.id).reduce((count, { amount }) => count + parseInt(amount), 0)
    const debit= this.state.invoice.debit.reduce((count, { total }) => count +total, 0);
  
    this.setState({
      total:parseInt(this.state.invoice.total)-(parseInt(receipt)+parseInt(debit))
    })
    return parseInt(this.state.invoice.total)-(parseInt(receipt)+parseInt(debit));
     
    }
  state = {
  invoice:{},
  address:[],
  customer:[],
  amount:0,
  gen:false,
  total:0,
  id:""
  }

  render() {
    const data={
      debit:this.props.curent,
      invoice:this.state.invoice

    }
    // setInStorage("debit",data);
    console.log( this.state," this.props.receipt.filter(x=>x.id==this.props.id)")
  
    return (
      <form onSubmit={this.onSubmitinvoicedec}>
          <div className='from-to mt-4'>
          <div className='from ' >
           
            <div class="card  mt-2 mb-4" style={{height:380}}>
              <div class="card-header ">BILL TO</div>
              <div class="card-body ">

                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                  <div class="col-sm-10">
                  <input type="text"  class="form-control datepica " disabled  value={this.state.customer.customer_name}  />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">NIC</label>
                  <div class="col-sm-10">
                  <input type="text"  class="form-control datepica" disabled value={this.state.customer.nic} />
                  </div>
                </div><div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Phone</label>
                  <div class="col-sm-10">
                  <input type="text"  class="form-control datepica" disabled value={this.state.customer.phonenumber}/>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-3 col-form-label">Address</label>
                  <div class="col-sm-9">
                  <input type="text"  class=" form-group form-control datepica" disabled value={this.state.address.no} />
                  <input type="text"  class="form-group form-control datepica" disabled value={this.state.address.area} />
                  <input type="text"  class="form-group form-control datepica" disabled value={this.state.address.city} />
                  </div>
                </div>
             
              </div>
            </div>
         

          </div>

         


          <div className='to'>
           
            <div className="card-group  mb-2 " >
              <div class="card mr-1   col-lg-6" style={{height:190}}>
                <div class="card-header  ">DEBIT NOTE NO</div>
                <div class="card-body "  style={{display:"flex",justifyContent:"center"}}>

                  <p> DN-{this.props.curent.id}</p>
                </div>
              </div>
              <div class="card  mr-1"style={{height:190}} >
                <div class="card-header ">DATE</div>
                <div class="card-body"  style={{display:"flex",justifyContent:"center"}}>
                  <p>{this.convert(this.state.invoice.createdAt)}</p>

                </div>
              </div>
            </div>
           
            <div className="card-group  mb-2" >
              <div class="card mr-1  col-lg-6" style={{height:190}}>
                <div class="card-header  ">REF INVOICE NO</div>
                <div class="card-body"  style={{display:"flex",justifyContent:"center"}}>
                <p>AK-{this.state.invoice.id}</p>

                </div>
              </div>
              <div class="card  mr-1"style={{height:190}} >
                <div class="card-header ">BALANCE DUE</div>
                <div class="card-body " style={{display:"flex",justifyContent:"center"}}>
                <p>{this.state.total}</p>

                </div>
              </div>
            </div>
           

            <button type="submit" required class="btn btn-lg btn-primary btn-block" disabled={this.state.gen} >GENERATE</button>

          

          </div> 
        </div>
          </form>     
      
    );
  }
}

const mapStateToProps = (state) => ({
  invoice:state.invoice.invoice,
  
  curent:state.debit.curent,
  receipt:state.receipt.receipt

  })
  export default connect(mapStateToProps, {getAinvoice,getreceipt,adddebit,getdebit})(FromTo);
  
  