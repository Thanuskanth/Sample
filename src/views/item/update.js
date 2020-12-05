
import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteItem, updateItem } from '../../actions/itemaction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pencil, X } from 'react-bootstrap-icons';
import { ImBin } from "react-icons/im";
import * as Yup from 'yup';
import { getFromStorage, setInStorage } from "../../storage"
import { header } from '../../actions/authaction';
import { Formik } from 'formik';
import {
  Box,

  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2'
// import { header } from '../../actions/authaction';
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { getservice } from '../../actions/service'

class UpdateItem extends Component {

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
                  <select class="custom-select" required id={row.id} value={row.service} onChange={this.onSelectItem}  >
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

                <input type="number" class="form-control " style={{ textAlign: "right" }} value={row.detail} onChange={this.onSelectStatus} id={row.id} />
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



  onChangeitem_name = (e) => {
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
    // console.log("this.state.role", this.state.role)
    const item = {
      item_name: this.state.item_name,
      amount: this.state.amount,
      detail: this.state.detail,
      service: JSON.stringify(this.state.rows),

      id: this.props.id
    }
    this.props.updateItem(item);
    this.ontoggle()
  }

  ontoggle = () => {
    this.setState({
      modalShow: !this.state.modalShow
    })
    this.componentDidMount();
  }
  componentDidMount() {
    this.props.getservice()

    console.log(this.props, "props")
    axios.get('http://localhost:8080/item/' + this.props.id, header(getFromStorage("auth"))).then(res => {
      console.log(res.data)
      if(res.data.service != null){this.setState({
        rows: JSON.parse(res.data.service)

      })}
      this.setState({

        item_name: res.data.item_name,
        detail: res.data.detail,
        amount: res.data.amount,

      })
    }

    )

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
            this.props.deleteItem(id);
          }
        })
      }
    })




  }
  render() {
    const { modalShow } = this.state;
    return (

      <div >

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
              {/* Create {this.props.data} */}
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
                      defaultValue={this.state.item_name}
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
                      defaultValue={this.state.detail}

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
                                          defaultValue={this.state.amount}

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
export default connect(mapStateToProps, { deleteItem, updateItem, getservice })(UpdateItem);



