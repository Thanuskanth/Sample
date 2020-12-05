// import React, { Component, Fragment } from 'react';
// import { Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
// import Register from './register.component';
// import Logout from './logout.component';
// import Login from './login.component';
// import { connect } from 'react-redux';
// import{ getFromStorage,setInStorage} from "../../../storage/index"
// import { red } from '@material-ui/core/colors';
// import image from "../../bill/src/logo.PNG"

// class NavBar extends Component {
//     state = {
//         isOpen: false,
//         user:{}
//     }
//     toggle = () => {
//         this.setState({
//             isOpen: !this.state.isOpen
//         })
//     }
//     componentDidMount(){
//         if(getFromStorage("auth") !=null){
//             this.setState({
//                 user:getFromStorage("auth").user
//             })
//         }
       
//     }
//     render() {
//         const {  isauthendicate } = this.props.auth;

//        const auth= getFromStorage("isauthendicate"); 

//         console.log(this.state.user,"this state")
//         const authlink =
//             (<Fragment>

//                 {auth ? <span className="navbar-text mr-3"><strong>welcome {getFromStorage("auth").user.username}</strong></span> : ""}
//                 <NavItem >
//                     <Logout />
//                 </NavItem>
//             </Fragment>)
//         const guestlink =
//             (<Fragment>
//                 <NavItem >
//                     <Register />

//                 </NavItem>
//                 <NavItem className="mr-4" >
//                     <Login />

//                 </NavItem>
//             </Fragment>)

//         return (

//             <div>
            
// <Navbar color="dark mynav" dark expand="sm" className="mb-5" style={{position:"fixed"}}>
//     <NavbarBrand href={'/'}><img src={image} width="100%" height="75%"  /></NavbarBrand>
//     <NavbarToggler onClick={this.toggle} />
//     <Collapse isOpen={this.state.isOpen} navbar>
//         <Nav className="ml-auto" navbar  >

//             {auth ? authlink : guestlink}
//         </Nav>
//     </Collapse>
// </Navbar>

//             </div>

//         )
//     }
// }
// const mapstateToProps = (state) => ({
//     auth: state.auth
// })
// export default connect(mapstateToProps, {})(NavBar);


import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Register from './register.component';
import Login from './login.component';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import PrintProvider, { NoPrint } from 'react-easy-print';

const useStyles = makeStyles(() => ({
  root: { zIndex:0},
  avatar: {
    width: 60,
    height: 60,
    
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <PrintProvider>
      <NoPrint>
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
       <Register/>
       <Login/>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
    </NoPrint>
    </PrintProvider>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
