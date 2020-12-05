import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { addItem } from '../../actions/itemaction';
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
class AddProgram extends Component {
    state = {
        modalShow: false,
         item_name: "",
         detail: "",
         amount: "",

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
        const item={item_name:this.state.item_name,detail:this.state.detail,amount:this.state.amount}
                console.log("item", item)
        this.props.addItem(item);
        this.setState({
          item_name: "",
         detail: "",
         amount: "",
        })
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
                    Create new Item
                  </Typography>
                  
                </Box>
                <TextField
                  
                  fullWidth
                  required
                  label="Item Name"
                  margin="normal"
                  name="itemName"                  
                  variant="outlined"
                  onChange={this.onChangename}
                />
                <TextField
                  
                  fullWidth
                  
                  label="Detail"
                  margin="normal"
                  name="detail"
                  variant="outlined"
                  onChange={this.onChangedetail}

                />
                <TextField
                  fullWidth
                  required
                  label="Amount"
                  margin="normal"
                  name="amount"                  
                  variant="outlined"
                  onChange={this.onChangeamount}

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

export default connect(null, { addItem })(AddProgram);

