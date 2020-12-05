import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { addProgram } from '../../actions/programaction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Yup from 'yup';
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
import { tr } from 'date-fns/locale';
class AddProgram extends Component {
    state = {
        modalShow: false,
         program_name: ""

    }

    onChange = (e) => {
        this.setState({
            program_name: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log("this.state.program_name", this.state.program_name)

        this.props.addProgram(this.state.program_name);
        this.ontoggle()
    }

    ontoggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }


    render() {
        const { modalShow } = this.state;
        return (

            <div  >
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
                    Create New Program
                  </Typography>
                  
                </Box>
              
                <input className="form-control" style={{marginBottom:10}} type="text" onChange={this.onChange}  placeholder="Enter  Program" autofocus />

             
                 {/* <TextField
                focused={true}
                  fullWidth
                  required
                  label="Program"
                  margin="normal"
                  name="program"                  
                  variant="outlined"
                  onChange={this.onChange}

                /> */}
                
               
              
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

export default connect(null, { addProgram })(AddProgram);

