
import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteservice, updateservice } from '../../actions/service';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pencil, X } from 'react-bootstrap-icons';
import { ImBin } from "react-icons/im";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { getFromStorage, setInStorage } from "../../storage"
import { header } from '../../actions/authaction';
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

class UpdateOwner extends Component {
    state = {
        modalShow: false,
       
        service: "",
      
       

    }




    onChangeservice = (e) => {
        this.setState({
          service: e.target.value
        })
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        // console.log("this.state.role", this.state.role)
        const service={
          service:this.state.service,
           
           
            id:this.props.id
        }
        this.props.updateservice(service);
        this.ontoggle()
        Swal.fire(
            this.state.service,
            'Your file has been Changed.',
            'success'
          )
    }

    ontoggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
        this.componentDidMount();
    }
   
    componentDidMount() {
        console.log(this.props,"props")
        axios.get('http://localhost:8080/service/' + this.props.id,header(getFromStorage("auth"))).then(res => {
            console.log(res.data)
            this.setState({
               
              service: res.data.service,
                
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
                  this.props.deleteservice(id);
                }
              })
          }
        })
            
  
         
       
  }
    render() {
        const { modalShow } = this.state;
        return (

            <div >

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
                      Create New Service
                  </Typography>

                  </Box>



                  <TextField
                    fullWidth
                    required
                    label="Service"
                    defaultValue={this.state.service}
                    margin="normal"
                    name="owner"
                    variant="outlined"
                    onChange={this.onChangeservice}

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
            </div>
        );
    }
}

export default connect(null, { deleteservice,updateservice })(UpdateOwner);



