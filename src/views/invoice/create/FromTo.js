import React from 'react';
import './FromTo.css'
import DatePicker from "react-datepicker";
import { getPackage } from '../../../actions/packageaction';
import { getProgram } from '../../../actions/programaction';
import { getOwner } from '../../../actions/owneraction'
import { addinvoice } from '../../../actions/invoiceacttion'
import { addCustomer } from '../../../actions/customeraction'
import { getinvoice, updateinvoice } from '../../../actions/invoiceacttion'
import { connect } from 'react-redux';
import { setInStorage } from "../../../storage/index"
import { addinvoicedec, updateinvoicedec, } from '../../../actions/itemdescription'

const ExampleCustomInput = ({ value, onClick }) => (
  <button class="btn  datepic " type="button" onClick={onClick}>
    {value}
  </button>
);
const today = new Date();
class FromTo extends React.PureComponent {
  componentDidMount() {
    this.props.getProgram();
    this.props.getPackage();
    this.props.getOwner();
    this.props.getinvoice();

  }
  state = {
    button: "GENERATE",
    disableUpdate: true,
    disablesave: false,
    disableGenerate: false,
    startdate: new Date(),
    modalShow: false,
    modalInvoiceShow: false,
    customer_name: "",
    nic: "",
    address: {
      no: "",
      area: "",
      city: ""
    },
    phonenumber: "",
    program: "",
    programname: "",
    package: "",
    packagename: "",
    date: new Date(),
    total: 0,
    owner: "",
    ownername: "",
    description: {},
    status: "NEW" ,
    show:false
  }

  onChangePackage = (e) => {
    this.setState({
      packagename:this.props.package.find(x=>x.id== e.target.value).package_name ,
      package:e.target.value
    })
  }
  onChangeOwner = (e) => {
      //  console.log(this.props.owner.find(x=>x.id== e.target.value),"this.props.program.find(x=>x.id== e.target.value)")

    this.setState({
      ownername:this.props.owner.find(x=>x.id== e.target.value).owner_name ,
      owner:e.target.value
    })
  }
  onChangeStatus = (e) => {
    this.setState({
      status: e.target.value
    })
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  onChangeProgram = (e) => {
    // console.log(this.props.program.find(x=>x.id== e.target.value),"this.props.program.find(x=>x.id== e.target.value)")
  //  const data=this.props.program.find(x=>x.id == e.target.value)
  //      console.log(data,"this.props.program.find(x=>x.id== e.target.value)")

    this.setState({
      programname:this.props.program.find(x=>x.id== e.target.value).program_name ,
      program:e.target.value    })
  }
  onChangename = (e) => {
    this.setState({
      customer_name: e.target.value
    })
  }
  onChangeadressno = (e) => {
    const address = { ...this.state.address }
    address.no = e.target.value
    this.setState({
      address
    })
  }
  onChangeadressare = (e) => {
    const address = { ...this.state.address }
    address.area = e.target.value
    this.setState({
      address
    })

  }
  onChangeadresscity = (e) => {
    const address = { ...this.state.address }
    address.city = e.target.value
    this.setState({
      address
    })

  }
  onChangenic = (e) => {
    this.setState({
      nic: e.target.value
    })
  }
  onChangephone = (e) => {
    this.setState({
      phonenumber: e.target.value
    })
  }
  updateState = (key, event) => {
    const value = event.target.textContent;
    this.setState({ [key]: value });
    localStorage.setItem(key, value);
    this.props.onUpdateState();
  }
  onChangeDate = (date) => {


    this.setState({
      startdate: date
    })

  }
  onChangeUpdate = () => {
    this.setState({
      disableUpdate: !this.state.disableUpdate
    })
  }

  onChangeSave = () => {

    if (!this.state.customer_name || !this.state.address || !this.state.nic || !this.state.phonenumber) {
      alert("fill all field")
    }
    else {
      const customer = {
        customer_name: this.state.customer_name,
        address: JSON.stringify(this.state.address),
        nic: this.state.nic,
        phonenumber: this.state.phonenumber,
      }
      this.props.addCustomer(customer);
      this.setState({

        disablesave: !this.state.disablesave
      })
    }


    // this.onChangeUpdate();
  }

  onChangeGenerate = () => {
    this.setState({
      button: "UPDATE",
      disableGenerate: !this.state.disableGenerate
    })
    this.onChangeUpdate();
  }
  onSubmitinvoice = (e) => {
    e.preventDefault();
    if (!this.state.program || !this.state.status || !this.state.package || !this.state.owner || !this.state.date ) {
      alert("fill all field")
    }
    else {
      if (this.state.button == "GENERATE") {

        const invoice = {

          programId: this.state.program,
          status: this.state.status,
          packageId: this.state.package,
          date: this.state.date,
          total: this.state.total,
          ownerId: this.state.owner,
          customerId: this.props.customer.id,

          order_id: this.convert(this.state.date) + "|" + this.state.programname + "|" + this.state.customer_name  + "|" + this.state.ownername
        }


        this.props.addinvoice(invoice);

        //   const des = {
        //   description: this.state.programname + "-" + this.state.packagename,
        //   amount: this.state.total,
        //   count: 1,
        //   invoice: this.props.curentinvoice.id,
        //   id: this.props.des.id
    
        // }
        // this.props.updateinvoicedec(des);


        this.onChangeUpdate();
        this.onChangeGenerate();
        this.setState({
          show:true
        })
      }
      else if (this.state.button == "UPDATE") {
        this.onUpdateinvoice(e)
      }
      else { }
    }
  }

  ongetAmount() {
    this.props.program_package.filter((obj => obj.program == this.state.program && obj.pac == this.state.package)).map(x => {
      this.setState({
        total: x.amount
      })
    })
    console.log(this.state.total, "this.satte.total")
  }
  onUpdateinvoice = (e) => {
    e.preventDefault();

    const invoice = {
      id: this.props.curentinvoice.id,
      programId: this.state.program,
      status: this.state.status,
      packageId: this.state.package,
      date: this.state.date,
      total: this.state.total,
      ownerId: this.state.owner,
      customerId: this.props.customer.id,

      order_id:this.convert(this.state.date) + "|" + this.state.programname + "|" + this.state.customer_name  + "|" + this.state.ownername
    }
    this.props.updateinvoice(invoice);
   
    // const des = {
    //   description: this.props.curentinvoice.programs.program_name + "-" + this.props.curentinvoice.package.package_name,
    //   amount: this.state.total,
    //   count: 1,
    //   invoice: this.props.curentinvoice.id,
    //   id: this.props.des.id

    // }
    // this.props.updateinvoicedec(des);

    setInStorage("items", invoice);

    this.onChangeUpdate();
    this.onChangeGenerate();
  }

  render() {
    this.ongetAmount();
    return (
      <form onSubmit={this.onSubmitinvoice} >
        <div className='from-to mt-4'>
          <div className='from ' >


            {/* <div class="card mr-1" style={{ height: 120 }} >
              <div class="card-header  " style={{ textAlign: "center" }}>STATUS</div>
              <div class="card-body ">



                <select class="custom-select customselect" required onChange={this.onChangeStatus}>
                  <option  >none</option>
                  <option value="OLD" >OLD</option>
                  <option value="NEW">NEW</option>


                </select>

              </div>
            </div> */}
            <div className="card-group  mb-2 ">
              <div class="card mr-1   col-lg-6" style={{ height: 120, padding: 0 }}>
                <div class="card-header  " style={{ textAlign: "center" }}>STATUS</div>
                <div class="card-body ">

                  <select class="custom-select customselect" disabled={this.state.disableGenerate} required onChange={this.onChangeStatus}>
                  <option >{this.state.status}</option>

                    <option value="OLD" >OLD</option>
                    <option value="NEW">NEW</option>


                  </select>                </div>
              </div>
              <div class="card  mr-1" style={{ height: 120, padding: 0 }}>
                <div class="card-header  " style={{ textAlign: "center" }}>OWNER</div>
                <div class="card-body">
                   

                      <select class="custom-select customselect" disabled={this.state.disableGenerate} required onChange={this.onChangeOwner}>
                      <option value={this.state.owner}>{this.state.ownername}</option>


                        {this.props.owner.map((owner) => (
                          <option value={owner.id}>{owner.owner_name}</option>
                        )
                        )
                        }
                      </select> 
                  
                </div>
              </div>
            </div>


            <div class="card  mt-2 mb-4" style={{ height: 470 }} >
              <div class="card-header ">BILL TO</div>
              <div class="card-body ">

                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                  <div class="col-sm-10">
                    <input type="text" required class="form-control datepica " disabled={this.state.disablesave} onChange={this.onChangename} placeholder="Enter Name" pattern="[a-zA-Z\s]{4,}" title="Letters only....,minimum 4 letters" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">NIC</label>
                  <div class="col-sm-10">
                    <input type="text" required class="form-control datepica" disabled={this.state.disablesave} onChange={this.onChangenic} placeholder="Enter NIC EX:xxxxxxxxxV" pattern="[0-9]{9}[vV]{1}|[0-9]{12}[vV]{1}" title="xxxxxxxxxV" />
                  </div>
                </div><div class="form-group row">
                  <label for="staticEmail" class="col-sm-2 col-form-label">Phone</label>
                  <div class="col-sm-10">
                    <input type="text" required class="form-control datepica" disabled={this.state.disablesave} onChange={this.onChangephone} placeholder="Enter Name EX:077-1234567"
                      pattern="[0-9]{3}-[0-9]{7,}" title="xxx-xxxxxxx" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-3 col-form-label">Address</label>
                  <div class="col-sm-9">
                    <input type="text" required class=" form-group form-control datepica" disabled={this.state.disablesave} onChange={this.onChangeadressno} placeholder="226,main street" pattern="[0-9a-zA-Z/-,.\s]{5,}" title="Minimum 5 charecter and No special charecter only number letter and , " />
                    <input type="text" required class="form-group form-control datepica" disabled={this.state.disablesave} onChange={this.onChangeadressare} placeholder="nallur" pattern="[a-zA-Z/-,.\s,]{4,}" title="Letters only....,minimum 4 letters" />
                    <input type="text" required class="form-group form-control datepica" disabled={this.state.disablesave} onChange={this.onChangeadresscity} placeholder="jaffna" pattern="[a-zA-Z/-.\s,]{4,}" title="Letters only....,minimum 4 letters" />
                  </div>
                </div>

                <button type="button" required class="btn btn-lg btn-primary btn-block" disabled={this.state.disablesave} onClick={this.onChangeSave}>Save</button>
              </div>

            </div>
            <button type="button" required class="btn btn-lg btn-primary btn-block" disabled={!this.props.curent} onClick={this.onChangeGenerate}>EDIT</button>

          </div>

          {/* right */}


          <div className='to'>

            <div className="card-group  mb-2 ">
              <div class="card mr-1   col-lg-6" >
                <div class="card-header  ">INVOICE NO</div>
                <div class="card-body ">
                {Object.keys( this.props.curentinvoice).length > 0 ?
                  <p> {this.props.curentinvoice.owners.tag}-{this.props.curentinvoice.id}</p>
                  :""}
                </div>
              </div>
              <div class="card  mr-1" >
                <div class="card-header ">DATE</div>
                <div class="card-body">
                  <p>{this.convert(today)}</p>

                </div>
              </div>
            </div>
            <div class="card mb-2" style={{ height: 150 }}>
              <div class="card-header  ">PROGRAM</div>
              <div class="card-body">
               

                    <select class="custom-select customselect" disabled={this.state.disableGenerate} required onChange={this.onChangeProgram}>
                      <option value={this.state.program}>{this.state.programname}</option>

                      {this.props.program.map((program) => (
                        <option value={program.id}>{program.program_name}</option>
                      )
                      )
                      }
                    </select>
                
              </div>
            </div>
            <div className="card-group  mb-2"  >
              <div class="card mr-1  col-lg-6" style={{ height: 150 }} >
                <div class="card-header  ">PACKAGE</div>
                <div class="card-body">
                 
                      <select class="custom-select customselect" required onChange={this.onChangePackage} disabled={this.state.disableGenerate}>
                        <option value={this.state.package} >{this.state.packagename}</option>

                        {this.props.package.map((pac) => (
                          <option value={pac.id}>{pac.package_name}</option>
                        )
                        )
                        }
                      </select>

                      
                </div>
              </div>
              <div class="card  mr-1" style={{ height: 150 }}>
                <div class="card-header ">PRO.DATE</div>
                <div class="card-body " style={{ display: "flex", justifyContent: "center" }}>
                  
                   
                      <DatePicker disabled={this.state.disableGenerate} selected={this.state.startdate} dateFormat="yyyy/MM/dd" onChange={this.onChangeDate} customInput={<ExampleCustomInput />} />
                     
                </div>
              </div>
            </div>
            <div class="card mb-4  " style={{ height: 150 }}>
              <div class="card-header  ">PROGRAM ID</div>
              <div class="card-body">

                <p>{this.convert(this.state.startdate) + "|" + this.state.programname + "|" + this.state.customer_name + "|" + this.state.ownername}</p>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-lg generate btn-block" disabled={this.state.disableGenerate || !this.state.disablesave} >{this.state.button}</button>



          </div>

        </div>
      </form >
    );
  }
}
const mapStateToProps = (state) => ({
  owner: state.owner.owner,
  package: state.package.package,
  program: state.program.program,
  program_package: state.program_package.program_package,
  invoice: state.invoice.invoice,
  curentinvoice: state.invoice.curentinvoice,
  curent: state.invoice.iscurent,
  customer: state.customer.curent,
  des: state.invoicedescription.curent

})
export default connect(mapStateToProps, { updateinvoice, getinvoice, addinvoice, addCustomer, addinvoicedec, getOwner, updateinvoicedec, getPackage, getProgram })(FromTo);

