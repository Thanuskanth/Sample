import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { Card ,CardContent,Box,Container} from '@material-ui/core';
import Page from 'src/components/Page';
// import Toolbar from './Toolbar';
import Update from './update';
import{ getFromStorage,setInStorage} from "../../../storage"
import {header} from '../../../actions/authaction'; 
import axios from 'axios';
class ListCustomer extends Component {
  state={
    receipt:[]
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
componentDidMount(){

    axios.get('http://localhost:8080/receipt/' + this.props.id, header(getFromStorage("auth"))).then(res => {
    console.log(res.data,"fffffffffffffffffff")
    this.setState({
      
      receipt: res.data,

    })
  })          }

    render() {
      const auth= getFromStorage("isauthendicate"); 
      console.log(this.state,"ssssstttttaaaa")
      console.log(this.props.id,"props.id")

        const customerdata=this.state.receipt.map(receipt=>
                {      
                  return{
                    name:receipt.for_payment_of,
                      date:this.convert(receipt.createdAt),
                      amount:receipt.amount,
                      remark:receipt.remark,
                      method:receipt.payment_method,
                      
                      action:<Update id={receipt.id}/>
                      }
    
                });

        const data = {
            columns: [
                {
                    label: 'For Payment Of',
                    field: 'name',
                   
                    width: 150
                },
                {
                    label: 'Date',
                    field: 'date',
                    
                    width: 270
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    
                    width: 200
                },
                {
                  label: 'PaymentMethod',
                  field: 'method',
                  
                  width: 200
              },
              {
                label: 'Remark',
                field: 'remark',
                
                width: 200
            },
                {
                    label: 'View',
                    field: 'action',
                    
                    width: 200
                }


            ],
            rows: 
            customerdata
                
        };


        
        return ( 
          <div>
           { auth ?
            <Page
            
            title="Customers"
          >
            <Container maxWidth={false}>
              {/* <Toolbar data={"Customer"} />  */}
              <Box mt={5} >
              <Card >
             <CardContent>
              <MDBDataTable
                     striped
                     hover
                     data={data}
                />
                </CardContent>
                </Card>
              </Box>
            </Container>
          </Page>
          :""}
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
    customer: state.customer,

})
export default connect(mapStateToProps, {})(ListCustomer);
