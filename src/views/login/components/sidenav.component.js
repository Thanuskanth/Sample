import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route } from "react-router-dom";
const toggle = () => this.setState({
  isOpen: !this.state.isOpen
});
class Navbarcomponent extends Component {
  state = {
    isOpen: false,count:null
  }
 componentDidMount(){

 }
 
  render() {
  
    
    return (
    
      <div className="sidenav "  >


<Navbar expand="lg" variant="light" className="navs" bg="light">

<Nav  className="flex-column  mr-auto ">
              <Nav.Link  className="m-3 "><Link to="/profile" className="navlink" > Profile </Link></Nav.Link>
              <Nav.Link className="m-3" > <Link to="/role" className="navlink"> Role</Link></Nav.Link>
              <Nav.Link className="m-3" > <Link to="/user" className="navlink"> User</Link></Nav.Link>
              <Nav.Link className="m-3" > <Link to="/myleave" className="navlink">My Leave</Link></Nav.Link>

             
         
            </Nav>
</Navbar>
      </div>
   
    );
  }
}
const mappropsTostate=(state)=>({
  user:state.auth.user,
  isauthendicate:state.auth.isauthendicate
})
export default connect(mappropsTostate,{ }) (Navbarcomponent);