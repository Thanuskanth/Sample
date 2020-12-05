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
    fromName: localStorage.getItem('fromName') || 'Your name',
    fromAddress: localStorage.getItem('fromAddress') || '123 Street, City, State, Country, Zip Code',
    fromTelephone: localStorage.getItem('fromTelephone') || '(+1) 123 123 1234',
    fromEmail: localStorage.getItem('fromEmail') || 'your.mail@gmail.com',
    toName: localStorage.getItem('toName') || 'Company name',
    toAddress: localStorage.getItem('toAddress') || '123 Street, City, State, Country, Zip Code',
    toTelephone: localStorage.getItem('toTelephone') || '(+1) 123 123 1234',
    toEmail: localStorage.getItem('toEmail') || 'company@gmail.com',
    button: "GENERATE",
    disableUpdate: true,
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
    program: "none",
    package: "none",
    date: new Date(),
    total: 1,
    owner: "AK",
    description: {},
    status: "NEW"
  }
  onChangePackage = (e) => {
    this.setState({
      package: e.target.value
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
    this.setState({
      program: e.target.value
    })
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
  onChangeGenerate = () => {
    this.setState({
      button: "UPDATE",
      disableGenerate: !this.state.disableGenerate
    })
    this.onChangeUpdate();
  }
  onSubmitinvoice = (e) => {
    if (this.state.button == "GENERATE") {
      e.preventDefault();
      const invoice = {

        program: this.state.program,
        status: this.state.status,
        package: this.state.package,
        date: this.state.date,
        total: this.state.total,
        owner: this.state.owner,
        customer_name: this.state.customer_name,
        address: JSON.stringify(this.state.address),
        nic: this.state.nic,
        phonenumber: this.state.phonenumber,
        order_id: this.convert(this.state.date) + "|" + this.state.program + "|" + this.state.customer_name
      }
      this.props.addinvoice(invoice);





      this.onChangeUpdate();
      this.onChangeGenerate();
    }
    else if (this.state.button == "UPDATE") {
      this.onUpdateinvoice(e)
    }
    else { }
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
      status: this.state.status,
      id: this.props.curentinvoice.id,
      program: this.state.program,
      package: this.state.package,
      date: this.state.date,
      total: this.state.total,
      owner: this.state.owner,
      customer_name: this.state.customer_name,
      address: this.state.address,
      nic: this.state.nic,
      phonenumber: this.state.phonenumber,
      order_id: this.convert(this.state.date) + "|" + this.state.program + "|" + this.state.customer_name
    }
    this.props.updateinvoice(invoice);
    const des = {
      description: this.state.program + "-" + this.state.package,
      amount: this.state.total,
      count: 1,
      invoice: this.props.curentinvoice.id,
      id: this.props.des.id

    }
    this.props.updateinvoicedec(des);

    setInStorage("items", invoice);

    this.onChangeUpdate();
    this.onChangeGenerate();
  }

  render() {
    this.ongetAmount();
    console.log(this.props, "propspropspros")
    return (
      <div className='App'>

        <div className='page mb-4'>

          <div className="bill">
            <form onSubmit={this.onSubmitinvoice} >
              <div className='from-to mt-4'>

                <div className='from ' >


                  <div class="card mr-1 mb-2" style={{ height: 120 }} >
                    <div class="card-header  " style={{ textAlign: "center" }}>INVOICE NO</div>
                    <div class="card-body ">
                      <select class="custom-select customselect" required onChange={this.onChangePackage} disabled={this.state.disableGenerate}>
                        <option >{this.state.package}</option>

                        {this.props.invoice.map((pac) => (
                          <option value={pac.id}>AK-{pac.id}</option>
                        )
                        )
                        }
                      </select>


                    </div>
                  </div>
                  <div class="card mr-1" style={{ height: 120 }} >
                    <div class="card-header  " style={{ textAlign: "center" }}>PAYMENT METHOD</div>
                    <div class="card-body ">



                      <select class="custom-select customselect" required onChange={this.onChangeStatus}>
                        <option  >None</option>
                        <option value="OLD" > CASH</option>
                        <option value="NEW">CHEQUE</option>


                      </select>



                    </div>
                  </div>






                  <div class="card  mt-2 mb-4" >
                    <div class="card-header ">FROM</div>
                    <div class="card-body ">

                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                          <input type="text" required class="form-control datepica " disabled={this.state.disableGenerate} onChange={this.onChangename} placeholder="Enter Name" pattern="[a-zA-Z\s]{4,}" title="Letters only....,minimum 4 letters" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">NIC</label>
                        <div class="col-sm-10">
                          <input type="text" required class="form-control datepica" disabled={this.state.disableGenerate} onChange={this.onChangenic} placeholder="Enter NIC EX:xxxxxxxxxV" pattern="[0-9]{9}[vV]{1}|[0-9]{12}[vV]{1}" title="xxxxxxxxxV" />
                        </div>
                      </div><div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Phone</label>
                        <div class="col-sm-10">
                          <input type="text" required class="form-control datepica" disabled={this.state.disableGenerate} onChange={this.onChangephone} placeholder="Enter Name EX:077-1234567"
                            pattern="[0-9]{3}-[0-9]{7,}" title="xxx-xxxxxxx" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-3 col-form-label">Address</label>
                        <div class="col-sm-9">
                          <input type="text" required class=" form-group form-control datepica" disabled={this.state.disableGenerate} onChange={this.onChangeadressno} placeholder="226,main street" pattern="[0-9a-zA-Z/-,.\s]{5,}" title="Minimum 5 charecter and No special charecter only number letter and , " />
                          <input type="text" required class="form-group form-control datepica" disabled={this.state.disableGenerate} onChange={this.onChangeadressare} placeholder="nallur" pattern="[a-zA-Z/-,.\s,]{4,}" title="Letters only....,minimum 4 letters" />
                          <input type="text" required class="form-group form-control datepica" disabled={this.state.disableGenerate} onChange={this.onChangeadresscity} placeholder="jaffna" pattern="[a-zA-Z/-.\s,]{4,}" title="Letters only....,minimum 4 letters" />
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
                        <input type="text" required class="form-control datepica " disabled={this.state.disableGenerate} onChange={this.onChangename} placeholder="Enter Name" pattern="[a-zA-Z\s]{4,}" title="Letters only....,minimum 4 letters" />


                      </div>
                    </div>
                  </div>
                  <div class="card mb-2" >
                    <div class="card-header  ">AMOUNT</div>
                    <div class="card-body">
                      <input type="text" required class="form-control datepica " disabled={this.state.disableGenerate} onChange={this.onChangename} placeholder="Enter Name" pattern="[a-zA-Z\s]{4,}" title="Letters only....,minimum 4 letters" />

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
                  <div class="card mb-5  " style={{ height: 140 }}>
                    <div class="card-header  ">NOTE</div>
                    <div class="card-body">

                      <input type="text" required class="form-control datepica " disabled={this.state.disableGenerate} onChange={this.onChangename} placeholder="Enter Name" pattern="[a-zA-Z\s]{4,}" title="Letters only....,minimum 4 letters" />
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary btn-lg generate btn-block" disabled={this.state.disableGenerate} >{this.state.button}</button>



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
  owner: state.owner.owner,
  package: state.package.package,
  program: state.program.program,
  program_package: state.program_package.program_package,
  invoice: state.invoice.invoice,
  curentinvoice: state.invoice.curentinvoice,
  curent: state.invoice.iscurent,
  des: state.invoicedescription.curent

})
export default connect(mapStateToProps, { updateinvoice, getinvoice, addinvoice, addCustomer, addinvoicedec, getOwner, updateinvoicedec, getPackage, getProgram })(FromTo);

