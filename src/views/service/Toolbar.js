import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { addservice } from '../../actions/service';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
class AddOwner extends Component {
  state = {
    modalShow: false,
    service: "",

  }

  onChange = (e) => {
    this.setState({
      service: e.target.value
    })
  }
 
  onSubmit = (e) => {
    e.preventDefault();
    const service = {
      service: this.state.service,
    }
    this.props.addservice(service);
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
            <Modal.Title id="contained-modal-title-vcenter">
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
                    margin="normal"
                    name="owner"
                    variant="outlined"
                    onChange={this.onChange}

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

export default connect(null, { addservice })(AddOwner);

