// import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';

import theme from 'src/theme';
import routes from 'src/routes';
import store from '../src/store';
import Print from "src/views/print/receipt";
const App = () => {
  const routing = useRoutes(routes);
console.log(store)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles /> 
      {routing}
      {/* <Print/> */}
    </ThemeProvider>
    
  );
};

export default App;


// import React,{Component} from 'react';
// // import './App.css';
// import Navbar from './views/login/components/navbar.component';
// import SideNavbar from './views/login/components/sidenav.component';

// import store from '../src/store';
// import {Provider} from 'react-redux';
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import RegisterView from 'src/views/auth/RegisterView';
// import SettingsView from 'src/views/settings/SettingsView';
// import Owner from 'src/views/owners';
// import Program from 'src/views/program';
// import Item from 'src/views/item';class  App extends Component {
//  componentDidMount(){
// // loadseeder()
//  }
//   render(){
//   return (
//     <Provider store={store}>
//        <Router	>
//     <div className="App">
   
          
//       <Navbar />
//        <SideNavbar />
     
//       <div className="sidenavcontant">
      
//          <Route path="/user" exact component={SettingsView}/>
//           <Route path="/role" exact  component={Item}/>
//           <Route path="/myleave" exact  component={Program}/>
//           <Route path="/leave" exact  component={Owner}/>
//           <Route path="/profile" exact  component={RegisterView}/>

//       </div>
//     </div>
//     </Router>
//     </Provider>
//   );
// }
// }

// export default  (App);
