import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
// import Create from './createuser.component';
import { getUser } from '../../../actions/useractions';
import { updatepassword } from '../../../actions/authaction';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Update from './updateuserprofile.component';
import Alert from 'react-bootstrap/Alert';
import  {clearError} from '../../../actions/erroraction';
import {getFromStorage} from "../../../storage"

class Profile extends Component {
  state={
    new:null,
    old:null,
    conform:null,
    user:{}
  }
  componentDidMount() {
    this.props.getUser();
    this.props.clearError()
this.setState({
  user:getFromStorage("auth").user
})


  }
componentDidUpdate(prevprops){
  if(prevprops!=this.props){
   
    if(this.props.err.id == "pwd_success"){
      this.setState({
        success:this.props.err.msg,
        
      })
    }
    if(this.props.err.id == "password_change"){
      this.setState({
        msg:this.props.err.msg,
       
      })
    }
    
    else{
      this.setState({
        msg:null
      })
    }
  }
}

onChangeold = (e) => {
  this.setState({
      old: e.target.value
  })
}

onChangenew = (e) => {
  this.setState({
      new: e.target.value
  })
}

onChangeconform = (e) => {
  this.setState({
      conform: e.target.value
  })
}
onSubmit = (e) => {
  e.preventDefault();
  this.setState({
    old:null,
    new:null,
    conform:null,
  })
  const password = {
    oldpassword:this.state.old,
    newpassword:this.state.new,
    conformpassword:this.state.conform,
  };

 this.props.updatepassword(this.state.user.id, password);
}
  render() {



    return (
      <div   >
        { getFromStorage("isauthendicate")?

          <div   >




            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    Details
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card>

                    <Card.Body>
                      <Card.Text>

                        <Table responsive>

                          <tbody>
                            <tr>

                              <th>UserName</th>
                              <td>{this.state.user.username}</td>
                              <td> <Update name="UserName" isemail={false}  value={this.state.user.username} id={this.state.user.id} /></td>
                            </tr>
                            <tr>

                              <th>Email</th>
                              <td>{this.state.user.email}</td>
                              <td> <Update name="Email" isemail={true} value={this.state.user.email} id={this.state.user.id} /></td>

                            </tr>
                            <tr>

                             
                              <td> </td>

                            </tr>

                          </tbody>
                        </Table>

                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Card.Header} eventKey="1" >
                    Change password
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body> 

                    
                  {this.state.msg ?
                
                            <Alert variant="danger">
                               {this.state.msg}
                            </Alert> 
                            : this.state.success ?   <Alert variant="success">
                            {this.state.success}
                         </Alert>  :""
                   

                  }
                         <Form onSubmit={this.onSubmit} onReset={true}>
                     <Form.Group controlId="formBasicPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control type="password" value={this.state.old} onChange={this.onChangeold} placeholder=" Enter Old Password" />
                  </Form.Group>  <Form.Group controlId="formBasicPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control type="password" value={this.state.new} onChange={this.onChangenew} placeholder=" Enter New Password" />
                    </Form.Group>  <Form.Group controlId="formBasicPassword">
                      <Form.Label>Conform Password</Form.Label>
                      <Form.Control type="password" value={this.state.conform} onChange={this.onChangeconform} placeholder=" Conform New Password" />
                    </Form.Group>
                    <Button variant="primary" sm="2" type="submit">
                                    Save
                                            </Button>
                    </Form>
                 
                    
                    </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>


          </div>
          : ""}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  err: state.error,
  isauthendicate: state.auth.isauthendicate

})
export default connect(mapStateToProps, { getUser,updatepassword,clearError })(Profile);
