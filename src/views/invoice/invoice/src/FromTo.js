import React from 'react';
import './FromTo.css'
import {getAinvoice} from '../../../../actions/invoiceacttion';
import{getFromStorage,setInStorage}from "../../../../storage"
import { connect } from 'react-redux';
import image from "./logo.PNG"
import {header} from '../../../../actions/authaction'; 
import axios from 'axios';
 
class FromTo extends React.PureComponent {
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  componentDidMount() {


    axios.get('http://localhost:8080/invoice/' + this.props.id,header(getFromStorage("auth"))).then(res => {
      console.log(res.data,"customer response")
      this.setState({
         
        invoice:res.data,
        customer:res.data.customers,
        owners:res.data.owners,
        program:res.data.programs,
        package:res.data.packages,
        address:JSON.parse(res.data.customers.address)
          
      })
      setInStorage("program",res.data);
  }

  )
  }
  state = {
  invoice:[],
  address:[],
  owners:[],
  customer:[],
  program:[],
  package:[],
 
  }

  render() {
console.log(this.state.invoice,"gbgbgbgb")
    return (
        <div className='from-to mt-4'>

          <div className='from ' >
            <div class="logo">
            <img src={image} width="100%" height="100%"  />
              </div>



            <div class="card  mt-2 mb-4" >
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
           
            <div className="card-group  mb-2 ">
              <div class="card mr-1   col-lg-6" >
                <div class="card-header  ">INVOICE NO</div>
                <div class="card-body ">

                  <p>{this.state.owners.tag} -{this.state.invoice.id}</p>
                </div>
              </div>
              <div class="card  mr-1" >
                <div class="card-header ">DATE</div>
                <div class="card-body">
                  <p>{this.convert(this.state.invoice.createdAt)}</p>

                </div>
              </div>
            </div>
            <div class="card mb-2" >
              <div class="card-header  ">PROGRAM</div>
              <div class="card-body">
              <p>{this.state.program.program_name}</p>

              </div>
            </div>
            <div className="card-group  mb-2">
              <div class="card mr-1  col-lg-6" >
                <div class="card-header  ">PACKAGE</div>
                <div class="card-body">
                <p>{this.state.package.package_name}</p>

                </div>
              </div>
              <div class="card  mr-1" >
                <div class="card-header ">PRO.DATE</div>
                <div class="card-body " style={{display:"flex",justifyContent:"center"}}>
                <p>{this.convert(this.state.invoice.date)}</p>

                </div>
              </div>
            </div>
            <div class="card mb-4 " >
              <div class="card-header  ">PROGRAM ID</div>
              <div class="card-body">

                <p>{this.state.invoice.order_id}</p>
              </div>
            </div>


          

          </div> 
                 
        </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  invoice:state.invoice.invoice,
  })
  export default connect(mapStateToProps, {getAinvoice})(FromTo);
  
  