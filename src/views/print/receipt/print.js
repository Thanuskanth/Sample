

import Receipt  from './index';
// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';

//  const  Example = () => {
//   const componentRef = useRef();
 
 
//   window.onafterprint = function(){
  
//  }
//   return (
//    <div >
//      <Receipt  />

//    </div>
     
    
//   );
// };
// export default   Example;





import React, { Component, Fragment } from 'react';
import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
// import "../invoice/create/FromTo.css"
import { connect } from 'react-redux';
// import { getFromStorage, removeFromStorage, setInStorage } from "../../storage"
import { Redirect } from 'react-router-dom'

const today = new Date();

class NavBar extends Component {
  
    componentDidMount() {
        // const add= getFromStorage("program").address
        
      

    }
    render() {
        // console.log((this.state.address), "this.state")
        return (


            <div>
                    <Receipt  />
 
            </div>

        )
    }
}
const mapstateToProps = (state) => ({
    auth: state.auth,
    curentinvoice: state.invoice.curentinvoice,
    curent: state.invoicedescription.curent,

})
export default connect(mapstateToProps, {})(NavBar);