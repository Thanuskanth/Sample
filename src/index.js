import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import App from './layouts/DashboardLayout/NavBar/tem';
// import App from './views/print/receipt';
// import App from './views/print/debit'; 
import "react-datepicker/dist/react-datepicker.css";
import store from '../src/store';
import {Provider} from 'react-redux';


ReactDOM.render((
  <Provider store={store}>

  <BrowserRouter>
   <App />
   {/* <Appl /> */}
   </BrowserRouter>
   </Provider>

  // <App />

), document.getElementById('root'));

serviceWorker.unregister();
