import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { getItem } from '../../actions/itemaction';
import { Card, CardContent, Box, Container } from '@material-ui/core';
import Page from 'src/components/Page';
// import Toolbar from './Toolbar';
import Update from './update';
import { getFromStorage, setInStorage } from "../../storage"
import { header } from '../../actions/authaction';
import axios from 'axios';
class ListItem extends Component {
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  componentDidMount() {
      axios.get('http://localhost:8080/invoice/' + this.props.id, header(getFromStorage("auth"))).then(res => {
      console.log(res.data, "fffffffffffffffffff")
      this.setState({

        receipt: res.data,
        debit:res.data.debit

      })
    })    
   
     
    
  }

  state={
    receipt:[],
    debit:[]
  }

  render() {
    const auth = getFromStorage("isauthendicate");
    
    const itemdata=this.state.debit.map(debit=>{
     
            
          return{
            date:this.convert(debit.createdAt),
              balance:debit.balance_due,
              total:debit.total,


              action:<Update id={debit.id}/>
              }
    }
    )
          

           

    const data = {
      columns: [
        
        {
          label: 'Date',
          field: 'date',

          width: 370
        },
        {
          label: 'Balance_due',
          field: 'balance',

          width: 270
        },

      {
          label: 'Total',
          field: 'total',

          width: 270
        },
        {
          label: 'View',
          field: 'action',

          width: 270
        },



      ],
      rows: 
      itemdata

    };


    return (
      <div>
        { auth ?
          <Page

            title="Item"
          >
            <Container maxWidth={false}>
              {/* <Toolbar data={"Item"}/>  */}
              <Box mt={5} >
                <Card >
                  <CardContent>
                    <MDBDataTable
                      entriesOptions={[5, 20, 25]}
                      entries={5}
                      striped
                      hover
                      data={data}
                    />
                  </CardContent>
                </Card>
              </Box>
            </Container>
          </Page>
          : ""}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  ainvoice: state.invoice.ainvoice

})
export default connect(mapStateToProps, {})(ListItem);
