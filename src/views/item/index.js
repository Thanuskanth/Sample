import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import {getItem} from '../../actions/itemaction';
import { Card ,CardContent,Box,Container} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Update from './update';
import{ getFromStorage,setInStorage} from "../../storage/index"

class ListItem extends Component {
componentDidMount(){
            this.props.getItem();
          }

    render() {
      const auth= getFromStorage("isauthendicate"); 
      this.props.item.item.sort(function(a, b) {
        var keyA =a.id,
          keyB = b.id;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
        const itemdata=this.props.item.item.map(item=>
                {      
                  return{
                    name:item.item_name,
                      detail:item.detail,
                      amount:item.amount,
                     
                      
                      action:<Update id={item.id}/>
                      }
    
                });

        const data = {
            columns: [
                {
                    label: 'ItemName',
                    field: 'name',
                   
                    width: 370
                },
                {
                    label: 'Detail',
                    field: 'detail',
                    
                    width: 370
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    
                    width: 270
                },
               
                {
                    label: 'Action',
                    field: 'action',
                    
                    width: 100
                }


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
              <Toolbar data={"Item"}/> 
              <Box mt={4} >
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
           :""}
           </div>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, {getItem})(ListItem);
