
import React, { Component } from 'react';
import { deleteCustomer, updateCustomer } from '../../actions/customeraction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pencil, X } from 'react-bootstrap-icons';
import { ImBin } from "react-icons/im";
import { RiBillLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import { getFromStorage, setInStorage } from "../../storage"
import { header } from '../../actions/authaction';
import NavItem from '../../layouts/DashboardLayout/NavBar/NavItem';
import {getPackage} from '../../actions/packageaction';
import {getProgram} from '../../actions/programaction';
import {getOwner} from '../../actions/owneraction'
import {addinvoice} from '../../actions/invoiceacttion'
import {
  Box,
 
  Checkbox,
  Container,
  FormHelperText,

  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2'
// import { header } from '../../actions/authaction';

class UpdateCustomer extends Component {
    state = {
      startdate:new Date(),
        modalShow: false,
        modalInvoiceShow :false,
        customer_name: "",
        nic: "",
        address: "",
        phonenumber: "",
        program:"none",
          package:"none",
          date:new Date(),
          amount:"none",
          owner:"none"

    }
 
  onChangePackage = (e) => {
    this.setState({
        package: e.target.value
    })
}
onChangeProgram = (e) => {
  this.setState({
      program: e.target.value
  })
}
onChangeDate = (e) => {
  this.setState({
      date: e.target.value
  })
}
onChangeOwner = (e) => {
  this.setState({
      owner: e.target.value
  })
}





    onChangeCustomer_name = (e) => {
        this.setState({
            customer_name: e.target.value
        })
    }

    
    onChangeDate = (date) => {
      this.setState({
        startdate:date
      })
  }
    onChangeNIC = (e) => {
        this.setState({
            nic: e.target.value
        })
    }
    onChangeAdress = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    onChangePhone = (e) => {
        this.setState({
            phonenumber: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        // console.log("this.state.role", this.state.role)
        const customer={
            customer_name:this.state.customer_name,
            nic:this.state.nic,
            phonenumber:this.state.phonenumber,
            address:this.state.address,
            id:this.props.id
        }
        this.props.updateCustomer(customer);
        this.ontoggle()
    }
    onSubmitinvoice = (e) => {
      e.preventDefault();
      // console.log("this.state.role", this.state.role)
      const invoice={
          customer:this.props.id,
          program:this.state.program,
          package:this.state.package,
          date:this.state.date,
          amount:this.state.amount,
          owner:this.state.owner
      }
      this.props.addinvoice(invoice);
      this.ontoggleInvoice()
  }

    ontoggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
        this.componentDidMount();
    }
    ontoggleInvoice = () => {
      this.setState({
        modalInvoiceShow: !this.state.modalInvoiceShow
      })
      // window.print();
      this.componentDidMount();
  }
    componentDidMount() {
      this.props.getProgram();
            this.props.getPackage();
            this.props.getOwner();
        console.log(this.props,"props")
        axios.get('http://localhost:8080/customer/' + this.props.id,header(getFromStorage("auth"))).then(res => {
            console.log(res.data,"customer response")
            this.setState({
               
                customer_name: res.data.customer_name,
                nic: res.data.nic,
                address: res.data.address,
                phonenumber:res.data.phonenumber,
                
            })
        }

        )
        
    }
    onDelete=(id)=>{
  
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
                title: "You won't be able to revert this!",
                text: "",
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
                  this.props.deleteCustomer(id);
                }
              })
          }
        })
            
  
         
       
  }
    render() {
        const { modalShow,modalInvoiceShow } = this.state;
        return (

            <div >
 <RiBillLine color="blue"  size={20} className="mr-3" onClick={this.ontoggleInvoice}/>
        
<Pencil color="green"  size={20} className="mr-3" onClick={this.ontoggle}/>
        
            
                
               
                <ImBin color="red" size={20} onClick={()=>this.onDelete(this.props.id)}/>
                                      
                <Modal
                    show={modalShow}
                    size="auto"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton onClick={this.ontoggle}>
                        <Modal.Title  id="contained-modal-title-vcenter">
                            {/* Create {this.props.data} */}
              </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
        
              <form onSubmit={this.onSubmit}>
                <Box mb={3} ml={12}>
                  <Typography
                    color="textSecondary"
                    variant="h3"
                  >
                    Update Customer
                  </Typography>
                  
                </Box>
                <TextField
                  
                  fullWidth
                  required
                  defaultValue={this.state.customer_name}
                  label="Customer Name"
                  margin="normal"
                  name="name"                  
                  variant="outlined"
                  onChange={this.onChangeCustomer_name}
                />
                <TextField
                  
                  fullWidth
                  required
                  defaultValue={this.state.nic}
                  label="NIC"
                  margin="normal"
                  name="nic"
                  variant="outlined"
                  onChange={this.onChangeNIC}

                />
                <TextField
                  fullWidth
                  required
                  defaultValue={this.state.address}
                  label="Adress"
                  margin="normal"
                  name="adress"                  
                  variant="outlined"
                  onChange={this.onChangeAdress}

                />
                 <TextField
                  fullWidth
                  required
                  defaultValue={this.state.phonenumber}
                  label="PhoneNumber"
                  margin="normal"
                  name="phone"                  
                  variant="outlined"
                  onChange={this.onChangePhone}

                />
                
               
              
                <Box ml={20}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    
                  >
                    Save
                  </Button>
                </Box>
                
              </form>
           
        </Container>
      </Box>
                    </Modal.Body>

                </Modal>

                {/* invoive */}



                <Modal
                    show={modalInvoiceShow}
                    size="auto"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton onClick={this.ontoggleInvoice}>
                        <Modal.Title  id="contained-modal-title-vcenter">
                            {/* Create {this.props.data} */}
              </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        
      >
        <Container maxWidth="sm">
         
              <form onSubmit={this.onSubmitinvoice}>
                <Box mb={3} ml={10}>
                  <Typography
                    color="textSecondary"
                    variant="h2"
                  >
                    Create new Invoice
                  </Typography>
                
                </Box>
               

    <div class="form-group row">
    <label for="staticEmail" class="col-sm-4 col-form-label">Select Program</label>
    <div class="col-sm-8">
    <Form.Group controlId="exampleForm.SelectCustom">
                                
                                <Form.Control as="select" ref="role" custom onChange={this.onChangeProgram}>
                                <option >none</option>
                                    {this.props.program.map((program) => (
                                        <option value={program.id}>{program.program_name}</option>
                                    )
                                    )
                                    }

                                </Form.Control>
                            </Form.Group>    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-4 col-form-label">Select Package</label>
    <div class="col-sm-8">
    <Form.Group controlId="exampleForm.SelectCustom">
                                
                                <Form.Control as="select" ref="role" custom onChange={this.onChangePackage}>
                                <option >none</option>
                                    {this.props.package.map((pac) => (
                                        <option value={pac.id}>{pac.package_name}</option>
                                    )
                                    )
                                    }

                                </Form.Control>
                            </Form.Group>    </div>
  </div>
  <div class="form-group row">
    <label for="staticEmail" class="col-sm-4 col-form-label">Select Owner</label>
    <div class="col-sm-8">
    <Form.Group controlId="exampleForm.SelectCustom">
                               
                                <Form.Control as="select" ref="role" custom onChange={this.onChangeOwner}>
                                <option >none</option>
                                    {this.props.owner.map((owner) => (
                                        <option value={owner.id}>{owner.owner_name}</option>
                                    )
                                    )
                                    }

                                </Form.Control>
                            </Form.Group>    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-4 col-form-label">Select Date</label>
    <div class="col-sm-8">
    <DatePicker  selected={this.state.startdate} onChange={this.onChangeDate}/>
    </div>
  </div>
      
                {/* <TextField
                  
                  fullWidth
                  id="standard-read-only-input" 
                  label="Amount"
                  margin="normal"
                  disabled                                
                  name="amount"
                 
                  type="password"
                 
                  variant="outlined"
                /> */}
               
                
                <Box my={2} mt={5}  ml={20}>
                  <Button
                 size="large"
                    color="primary"
                    
                    fullWidth
                    size="large"
                    type="submit"
                   
                  >
                    Print Bill
                  </Button>
                </Box>
                
              </form>
           
        </Container>
      </Box>
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
  // isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, { deleteCustomer,updateCustomer,getOwner,getPackage,getProgram,addinvoice })(UpdateCustomer);



