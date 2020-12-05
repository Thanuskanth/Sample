import React from 'react';
import './Table.css';
import Table from './Table';
import FromTo from './FromTo';
export default class App extends React.PureComponent {
 
  render() {

    console.log("this.state.state",this.state)
    return (

      <div>      
      <div  className="container">
        
        <div className='App'>
      
          <div className='page mb-4'>
            
            <div className="bill">
            <FromTo  id={this.props.id}/>
            <Table id={this.props.id} />
            </div>
          </div>
          
        </div>
 
      </div>
     
     </div>
     
    );
  }
}



