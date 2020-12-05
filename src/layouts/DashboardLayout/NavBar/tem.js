import React ,{ useRef }from 'react';
import { connect } from 'react-redux';
// import Page from "../../print/navbar.component";
import { PDFViewer } from '@react-pdf/renderer';

import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

import Dashbord  from '../../../App';
import Nav  from '../../../views/login/components/navbar.component';
import{ getFromStorage,setInStorage} from "../../../storage"


class App extends React.PureComponent {

  state = {
    
  }

 
 
  render() {
    const auth= getFromStorage("isauthendicate"); 

    return (

      <div>
      { auth ?
      <Dashbord/>
     :<Nav/>}</div>
     
    );
  }
}

const mapStateToProps = (state) => ({
  isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, {})(App);



