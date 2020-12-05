import React from 'react';
import './Table.css';
import Table from './Tableeditable';
import FromTo from './FromTo';
import {getinvoicedec} from '../../../actions/itemdescription';

import { connect } from 'react-redux';



class App extends React.PureComponent {

  state = {
    
  }
componentDidMount(){


}
  updateTitle = (event) => {
    const title = event.target.textContent;
    this.setState({title});
    localStorage.setItem('title', title);
    this.onUpdateState();
  }
 
  onUpdateState = () => {
    this.setState({saved: 0})
    setTimeout(() => {
      this.setState({
        saved: Date.now() + 2 * 1000
      })
      setTimeout(() => {
        if (Date.now() > this.state.saved) {
          this.setState({ saved: 0 })
        }
      }, 2500)
    }, 300) 
  }

  render() {

    console.log("this.state.state",this.state)
    return (

      <div>
      {/* { auth ? */}
      
      <div  className="container">
        
          {/* <NoPrint> */}
        <div className='App'>
      
          <div className='page mb-4'>
            
            <div className="bill">
            <FromTo onUpdateState={this.onUpdateState} id={this.props.id}/>
            <Table onUpdateState={this.onUpdateState} id={this.props.id} />
            </div>
          </div>
          
        </div>

        {/* </NoPrint> */}
      
        
        
      
     
      
      </div>
     
     {/* :""} */}
     </div>
     
    );
  }
}

const mapStateToProps = (state) => ({
invoice:state.invoice.invoice,
invoicedescription:state.invoicedescription.invoicedescription,
})
export default connect(mapStateToProps, {getinvoicedec})(App);



