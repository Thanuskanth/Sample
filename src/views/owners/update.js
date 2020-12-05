
import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteOwner, updateOwner } from '../../actions/owneraction';
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
        owner:{},
        owner_name: "",
        tag:""
       

    }




    onChangeowner_name = (e) => {
        this.setState({
            owner_name: e.target.value
        })
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        // console.log("this.state.role", this.state.role)
        const owner={
            owner_name:this.state.owner_name,
            tag:this.state.tag,
           
            id:this.props.id
        }
        this.props.updateOwner(owner);
        this.ontoggle()
        Swal.fire(
            this.state.owner_name,
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
    onChangeTag = (e) => {
      this.setState({
        tag: e.target.value
      })
    }
    componentDidMount() {
        console.log(this.props,"props")
        axios.get('http://localhost:8080/owner/' + this.props.id,header(getFromStorage("auth"))).then(res => {
            console.log(res.data)
            this.setState({
               
                owner_name: res.data.owner_name,
                
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
                  this.props.deleteOwner(id);
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
                    Update Owner
                  </Typography>
                  
                </Box>
              
             
             
                 <TextField
                  fullWidth
                  required
                  label="Owner"
                  defaultValue={this.state.owner_name}
                  margin="normal"
                  name="owner"                  
                  variant="outlined"
                  onChange={this.onChangeowner_name}

                />
                 <TextField
                    fullWidth
                    required
                    label="Tag"
                    margin="normal"
                    name="tag"
                    variant="outlined"
                    onChange={this.onChangeTag}

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

export default connect(null, { deleteOwner,updateOwner })(UpdateOwner);



