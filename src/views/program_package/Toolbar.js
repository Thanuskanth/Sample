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
import { getservice } from '../../actions/service'
import {getOwner } from '../../actions/owneraction'
import {addpropac } from '../../actions/program_package'
import Table from './Table';
import "./Table.css"
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import {getItem } from '../../actions/itemaction'
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
    status: "",
    rows: this.getRowList(),
    showGenerateRowsModal: false,
    num: 1,
    item: "",
    detail: "",
    count: 1,
    amount: 0,
    package_detail: "",
    pac_amm: 0,
    isprint: true,
    savebut: "",
    owner:"",
    service:[],
    servicenum:1

  }
  

  onSubmitinvoicedec = (e) => {
 console.log(this.state.rows,"this state row")
    e.preventDefault();

  
    const val = {
      programId: this.state.program,
      packageId: this.state.package,
      items:JSON.stringify(this.state.rows) ,
      service:JSON.stringify(this.state.service) ,
      ownerId: this.state.owner,
      amount: this.state.amount,
    }
    this.props.addpropac(val);
    this.ontoggle()

   this.setState({
     rows:[]
   })
  

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


        return Object.assign(el, {  item: e.target.value })
      return el
    });
    this.setState({ rows: newData });

  }
  
 
  onSelectDetail = (e) => {

    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, { detail: e.target.value })
      return el
    });
    this.setState({ rows: newData });

  }
  
 
  onSelectStatus = (e) => {

    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, {  status: e.target.value })
      return el
    });
    this.setState({ rows: newData });

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
  




  getServiceRows = () => {
    return this.state.service.map((row) => {
      return (<div>
        <tr class="d-flex ">
          <td class=" col-8">
            <div class="row ">
              <div class="col-12 ">
                <select class="custom-select" required id={row.id}  onChange={this.onSelectServiceStatus}  >
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

            <input type="number" class="form-control " style={{ textAlign: "right" }} value={row.detail} onChange={this.onSelectServiceDetail} id={row.id} />
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

              <input type="number" class="form-control " style={{ textAlign: "right" }} onChange={this.onSelectStatus} id={row.id} />
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


  removeRow = (id) => {
    const rows = this.state.rows.filter(x => x.id != id);
    this.setState({
      rows: rows
    })
  }
  
  removeServiceRow = (id) => {
    const service = this.state.service.filter(x => x.id != id);
    this.setState({
      service: service
    })
  }


  removeRows = () => {
    this.updateRows([]);
  }

 

  updateRows = (rows) => {
    this.setState({ rows });
  }

  componentDidMount() {
    this.props.getOwner();
    this.props.getPackage();
    this.props.getProgram();
    this.props.getItem();
    this.props.getservice();
    

  }

  onChangeprogram = (e) => {
    this.setState({
      program: e.target.value
    })
  }
  onChangeOwner = (e) => {
    this.setState({
      owner: e.target.value
    })
  }
  
  onChangepackage = (e) => {
    this.setState({
      package: e.target.value
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


  render() {
    console.log(this.state,"statestaettttttttttttt")
    const { modalShow } = this.state;
    return (

      <div  style={{padding:20}} >
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={3}
        >

          <Button
            color="primary"

            onClick={this.ontoggle}
          >
            ADD {this.props.data}
          </Button>
        </Box>



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
                      <option value="none">none</option>
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
                      <option value="none">none</option>
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
                      <option value="none">none</option>
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
                <div class="col pt-2 pb-2">
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
export default connect(mapStateToProps, { getOwner, getPackage, getProgram ,getItem,addpropac,getservice})(AddProgram);

