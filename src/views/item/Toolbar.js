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
import { getservice } from '../../actions/service'
import { addItem } from '../../actions/itemaction';

import { addpropac } from '../../actions/program_package'
// import Table from './Table';
import "../program_package/Table.css"
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { getItem } from '../../actions/itemaction'
import {
  Box,
  TextField,


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
    
    status: "",
    rows: this.getRowList(),
    showGenerateRowsModal: false,
    num: 1,
    item: "",
    detail: "",
    count: 1,
    // amount: 0,
    package_detail: "",
    pac_amm: 0,
    isprint: true,
    savebut: "",
    owner: "",
    service: [],
    servicenum: 1,
    item_name: "",
    detail: "",
    amount: "",

  }


 


  onSelectItem = (e) => {

    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, { service: e.target.value })
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


        return Object.assign(el, { detail: e.target.value })
      return el
    });
    this.setState({ rows: newData });

  }



  getRows = () => {
    return this.state.rows.map((row) => {
      return (<div>
        <tr class="d-flex ">
          <td class=" col-8">
            <div class="row ">
              <div class="col-12 ">
                <select class="custom-select center" required id={row.id} value={row.service} onChange={this.onSelectItem}  >
                  <option >none</option>

                  {this.props.service.map((service) => (
                    <option value={service.service}>{service.service}</option>
                  )
                  )
                  }


                </select>
              </div>

            </div>


          </td>
          <td class=" col-4">
            <div class="form-group  ">

              <input type="number" class="form-control center" style={{ textAlign: "right" }} value={row.detail} onChange={this.onSelectStatus} id={row.id} />
            </div>


            <div className='controlsservice'>
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
        service: '',
        detail: 0


      }
    ]
    this.setState({ num: this.state.num + 1 })
    this.updateRows(rows);

  }


  removeRow = (id) => {
    const rows = this.state.rows.filter(x => x.id != id);
    this.setState({
      rows: rows
    })
  }





  updateRows = (rows) => {
    this.setState({ rows });
  }



  ontoggle = () => {
    this.setState({
      modalShow: !this.state.modalShow
    })
  }


  onChangename = (e) => {
    this.setState({
      item_name: e.target.value
    })
  }
  onChangedetail = (e) => {
    this.setState({
      detail: e.target.value
    })
  }
  onChangeamount = (e) => {
    this.setState({
      amount: e.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    // console.log("this.state.program_name", this.state.program_name)
    const item = { item_name: this.state.item_name, detail: this.state.detail, amount: this.state.amount,service:JSON.stringify(this.state.rows) }
    console.log("item", item)
    this.props.addItem(item);
    this.setState({
      item_name: "",
      detail: "",
      amount: "",
      rows: []
    })
    this.ontoggle()
    

  }
componentDidMount(){
  this.props.getservice()
}
  render() {
    console.log(this.state,"dfvbghjjjjjjjjjjjj")
    const { modalShow } = this.state;
    return (

      <div >
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
                  <div class="card-header center">ITEM</div>
                  <div class="card-body">
                    <input
                      className="form-control center"
                      fullWidth
                      required
                      label="Item Name"
                      margin="normal"
                      name="itemName"
                      variant="outlined"
                      onChange={this.onChangename}
                      placeholder="Enter Item Name...."

                    />

                  </div>
                </div>
                <div class="  col-6" >
                  <div class="card-header center ">DETAIL</div>
                  <div class="card-body">
                    <input

                      fullWidth
                      className="form-control center"
                      placeholder="Enter Detail...."

                      label="Detail"
                      margin="normal"
                      name="detail"
                      variant="outlined"
                      onChange={this.onChangedetail}

                    />

                  </div>
                </div>
              </div>
              <div className="row mb-2" >
                <div class="  col-3" >

                </div>
                <div class="  col-6 "  >
                  <div class="card-header center">AMOUNT</div>
                  <div class="card-body">
                    <input
                      fullWidth
                      required
                      placeholder="Enter Amount...."
                      margin="normal"
                      name="amount"
                      variant="outlined"
                      onChange={this.onChangeamount}
                      className="form-control center"

                    />

                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="amount">
                <form onSubmit={this.onSubmit}>




                  <table class=" table-bordered">
                    <thead>
                      <tr class="d-flex">
                        <th class="col-8" >service</th>
                        <th class="col-4">STATUS</th>

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
  
  service: state.service.service,


})
export default connect(mapStateToProps, { getservice,addItem })(AddProgram);

