import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { getProgram } from '../../actions/programaction'
import { getPackage } from '../../actions/packageaction'
import { getOwner } from '../../actions/owneraction'
import { updatepropac,deletepropac } from '../../actions/program_package'
import Table from './Table';
import "./Table.css"
import { getFromStorage, setInStorage } from "../../storage"
import { header } from '../../actions/authaction';
import axios from 'axios';
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { getItem } from '../../actions/itemaction'
import { Pencil, X } from 'react-bootstrap-icons';
import { ImBin } from "react-icons/im";
import Swal from 'sweetalert2'
import { getservice } from '../../actions/service'

import {
  Box,


} from '@material-ui/core';
import FromTo from '../invoice/invoice/src/FromTo';


class AddProgram extends Component {

  getRowList = () => {
    const rows = {
    };
    if (rows) {
      try {
        return JSON.parse(rows);
      } catch (err) {
        console.error(err);
        return [];
      }
    }
    return [];
  }

  state = {
    modalShow: false,
    program: "",
    package: "",
    program_id: "",
    package_id: "",
    status: "",
    rows: [],
    showGenerateRowsModal: false,
    num: 1,
    items: "",
    detail: "",
    count: 1,
    amount: 0,
    package_detail: "",
    pac_amm: 0,
    isprint: true,
    savebut: "",
    owner: "",
    owners: "",
    id: "",
    service:[],
    servicenum:1

  }


  onSubmitinvoicedec = (e) => {
    // console.log(this.state.rows, "this state row")
    e.preventDefault();


    const val = {
      programId: this.state.program_id,
      packageId: this.state.package_id,
      items: JSON.stringify(this.state.rows),
      service: JSON.stringify(this.state.service),
      ownerId:this.state.owner,
      amount: this.state.amount,
    }
    this.props.updatepropac(this.state.id,val);
    this.ontoggle()




  }

  onChangeRowName = (event, aKey) => {
    const rows = this.state.rows.map((row) => {
      if (row.key === aKey) {
        return {
          ...row,
          name: event.currentTarget.textContent
        }
      }
      return row;
    });
    this.updateRows(rows);
  }


  onSelectItem = (e) => {

    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, { item: e.target.value })
      return el
    });
    this.setState({ rows: newData });
console.log(this.state.rows,"onSelectItem")
  }


  onSelectDetail = (e) => {

    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, { detail: e.target.value })
      return el
    });
    this.setState({ rows: newData });
    console.log(this.state.rows,"onSelectDetail")


  }


  onSelectStatus = (e) => {

    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, { status: e.target.value })
      return el
    });
    this.setState({ rows: newData });
    console.log(this.state.rows,"onSelectStatus")

  }




  getRows = () => {
    return this.state.rows.map((row) => {
      return (<div>
        <tr class="d-flex ">
          <td class=" col-6">
            <div class="row ">
              <div class="col-12 ">
                <select class="custom-select" required id={row.id} value={row.item} onChange={this.onSelectItem}  >
                  <option >none</option>

                  {this.props.item.map((item) => (
                    <option value={item.item_name}>{item.item_name}</option>
                  )
                  )
                  }


                </select>
              </div>

            </div>


          </td>
          <td class=" col-4">
            <div class="form-group  ">

              <select class="custom-select" required id={row.id} value={row.detail} onChange={this.onSelectDetail}>
                <option >none</option>


                {this.props.item.map((item) => (
                  <option value={item.detail}>{item.detail}</option>
                )
                )
                }

              </select>            </div>


          </td>

          <td class=" col-2">


            <div class="form-group  ">

              <input type="number" class="form-control " defaultValue={row.status} style={{ textAlign: "right" }} onChange={this.onSelectStatus} id={row.id} />
            </div>

            <div className='controls'>
              <AiOutlineClose
                display={this.state.savebut}

                color="red"
                onClick={() => this.removeRow(row.id)} />
            </div>
          </td>
        </tr>

      </div>
      );
    });
  }

  addRow = () => {
    const rows = [
      ...this.state.rows,
      {
        id: this.state.num,
        item: '',
        detail: 20,
        status: 0,

      }
    ]
    this.setState({ num: this.state.num + 1 })
    this.updateRows(rows);

  }


  removeRow = (id) => {
    alert(id)
    const rows = this.state.rows.filter((x)=>( x.id != id));
    this.setState({
      rows: rows
    })
    // console.log(rows,"removeRow")

  }

  removeRows = () => {
    this.updateRows([]);
  }

  onDelete = (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.props.deletepropac(id);
          }
        })
      }
    })




  }

  updateRows = (rows) => {
    this.setState({ rows });
    localStorage.setItem('rows', JSON.stringify(rows));
  }

  componentDidMount() {
this.props.getservice();
    axios.get('http://localhost:8080/program_package/' + this.props.id, header(getFromStorage("auth"))).then(res => {
      console.log(res.data)
      this.setState({
        id: res.data.id,
        package_id: res.data.packages.id,
        package: res.data.packages,
        program_id: res.data.programs.id,
        program: res.data.programs,
        amount: res.data.amount,
        rows: JSON.parse(res.data.items),
        service: JSON.parse(res.data.service),
        num:Object.keys(JSON.parse(res.data.items)).length+1,
        servicenum:Object.keys(JSON.parse(res.data.service)).length+1,
        owners: res.data.owners,
        owner: res.data.owners.id

      })
    }

    )

  }

  onChangeprogram = (e) => {
    this.setState({
      program_id: e.target.value
    })
  }
  onChangeOwner = (e) => {
    this.setState({
      owner: e.target.value
    })
  }

  onSelectServiceDetail = (e) => {

    var newData = this.state.service.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, { detail: e.target.value })
      return el
    });
    this.setState({ service: newData });

  }
  
 
  onSelectServiceStatus = (e) => {

    var newData = this.state.service.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, {  service: e.target.value })
      return el
    });
    this.setState({ service: newData });

  }
  

  onChangepackage = (e) => {
    this.setState({
      package_id: e.target.value
    })
  }
  onChangeamount = (e) => {
    this.setState({
      amount: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    const item = { program: this.state.program, pac: this.state.package, amount: this.state.amount }
    this.props.addpropac(item);
    this.ontoggle()
  }

  ontoggle = () => {
    this.setState({
      modalShow: !this.state.modalShow
    })
  }
  removeServiceRow = (id) => {
    const service = this.state.service.filter(x => x.id != id);
    this.setState({
      service: service
    })
  }

  getServiceRows = () => {
    return this.state.service.map((row) => {
      return (<div>
        <tr class="d-flex ">
          <td class=" col-8">
            <div class="row ">
              <div class="col-12 ">
                <select class="custom-select" required id={row.id} defaultValue={row.service}  onChange={this.onSelectServiceStatus}  >
                  <option >none</option>

                  {this.props.service.map((item) => (
                    <option value={item.service}>{item.service}</option>
                  )
                  )
                  }
                 

                </select>
              </div>
             
            </div>


          </td>
          <td class=" col-4">
            <div class="form-group  ">

            <input type="number" class="form-control " style={{ textAlign: "right" }} defaultValue={row.detail} onChange={this.onSelectServiceDetail} id={row.id} />
          </div>

                <div className='controlsservice' >
              <AiOutlineClose
                display={this.state.savebut}

                color="red"
                onClick={() => this.removeServiceRow(row.id)} />
            </div>
          </td>

        
        </tr>

      </div>
      );
    });
  }

  addServiceRow = () => {
    const service = [
      ...this.state.service,
      {
        id: this.state.servicenum,
        service: '',
        detail: "",
       
        
      }
    ]
    this.setState({ servicenum: this.state.servicenum + 1 })
    this.setState({ service });

  }

  render() {
        // console.log(this.state.rows,"removeRow")

    const { modalShow } = this.state;
    return (

      <div   >

        <Pencil color="green" size={20} className="mr-3" onClick={this.ontoggle} />


        <ImBin color="red" size={20} onClick={() => this.onDelete(this.props.id)} />




        <Modal
          show={modalShow}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={this.ontoggle}>
            <Modal.Title id="contained-modal-title-vcenter">
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div style={{ height: 280 }}>
              <div className="row mb-2"  >
                <div class=" col-6 " >
                  <div class="card-header center">PROGRAM</div>
                  <div class="card-body">
                    <select class="custom-select" id="inputGroupSelect01" onChange={this.onChangeprogram} required>
                      <option value={this.state.program.id}>{this.state.program.program_name}</option>
                      {this.props.program.map((program) => (
                        <option value={program.id}>{program.program_name}</option>
                      )
                      )
                      }
                    </select>

                  </div>
                </div>
                <div class="  col-6" >
                  <div class="card-header center ">PACKAGE</div>
                  <div class="card-body">
                    <select class="custom-select" id="inputGroupSelect01" onChange={this.onChangepackage} required>
                    <option value={this.state.package.id}>{this.state.package.package_name}</option>
                      {this.props.package.map((pac) => (
                        <option value={pac.id}>{pac.package_name}</option>
                      )
                      )
                      }
                    </select>

                  </div>
                </div>
              </div>
              <div className="row mb-2" >
                <div class="  col-6" >
                  <div class="card-header center">OWNER</div>
                  <div class="card-body">
                    <select class="custom-select" id="inputGroupSelect01" onChange={this.onChangeOwner} required>
                      <option value={this.state.owners.id}>{this.state.owners.owner_name}</option>
                      {this.props.owner.map((owner) => (
                        <option value={owner.id}>{owner.owner_name}</option>
                      )
                      )
                      }
                    </select>

                  </div>
                </div>
                <div class="  col-6 "  >
                  <div class="card-header center">AMOUNT</div>
                  <div class="card-body">
                    <input
                      defaultValue={this.state.amount}
                      className="form-control"
                      required
                      placeholder="Enter Amount ...."
                      onChange={this.onChangeamount}
                    />

                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="amount">
                <form onSubmit={this.onSubmitinvoicedec}>
                  <table class=" table-bordered">
                    <thead>
                      <tr class="d-flex">
                        <th class="col-6" >ITEM</th>
                        <th class="col-4 center">DESCRIPTION</th>
                        <th class="col-2">STATUS</th>

                      </tr>
                    </thead>
                    <tbody>

                      {this.getRows()}

                    </tbody>
                  </table>
                  <div className='Total'>
                    <div class="container">
                      <div class="row">
                        <div class="col pt-2">
                          <button
                            type="button" class="btn btn-success left"
                            onClick={this.addRow}><AiOutlinePlus /></button>
                        </div>


                      </div>
                    </div>
                  </div>



                  <table class=" table-bordered mt-4"  >
            <thead>
              <tr class="d-flex">
                <th class="col-8" >SERVICE</th>
                <th class="col-4">STATUS</th>

              </tr>
            </thead>
            <tbody>
            
              {this.getServiceRows()}

            </tbody>
          </table>
          <div className='Total'>
            <div class="container">
              <div class="row">
                <div class="col pt-2">
                  <button
                    type="button" class="btn btn-success left"
                    onClick={this.addServiceRow}><AiOutlinePlus /></button>
                </div>
               
               
              </div>
            </div>
          </div>


                  <div className=''>

                  </div>

                  <div class="row justify-content-between" style={{ marginTop: 30 }}>
                    <div class="center col-4"></div>
                    <div class="center col-4">
                      <button type="submit" class="btn btn-lg btn-primary btn-block print"  >Save</button>

                    </div>
                    <div class="col-4">

                    </div>
                  </div>

                </form>

              </div>
            </div>
          </Modal.Body>

        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  owner: state.owner.owner,
  package: state.package.package,
  program: state.program.program,
  item: state.item.item,
  service: state.service.service,


})
export default connect(mapStateToProps, { getOwner, getPackage, getProgram, getItem, updatepropac ,deletepropac,getservice})(AddProgram);

