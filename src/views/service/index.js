import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import {getservice} from '../../actions/service';
import { Card ,CardContent,Box,Container} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Update from './update';
import{ getFromStorage,setInStorage} from "../../storage/index"

class ListOwner extends Component {

componentDidMount(){
            this.props.getservice();
            // this.printChart()
          }

    render() {
     
      const auth= getFromStorage("isauthendicate"); 
      this.props.service.sort(function(a, b) {
        var keyA =a.id,
          keyB = b.id;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
        const ownerdata=this.props.service.map(service=>
                {      
                  return{
                    service:service.service,
                   
                     
                      action:<Update id={service.id}/>
                      }
    
                });

        const data = {
            columns: [
                {
                    label: 'Service',
                    field: 'service',
                   
                    width: 150
                },
               
             
               
                {
                    label: 'Action',
                    field: 'action',
                    
                    width: 200
                }


            ],
            rows: 
            ownerdata
                
        };


        return (
          <div>
          { auth ?
            <Page
            
            title="Service"
          >
            <Container maxWidth={false}>
              <Toolbar data={"Service"}/> 
              <Box mt={5} >
              <Card >
             <CardContent>
              <MDBDataTable
               entriesOptions={[5, 20, 25]}
               entries={5}
                    
                     data={data}
                     hover
                     entriesOptions={[5, 10]}
                     entries={5}
                     pagesAmount={4}
                     pagingTop
                     searchTop
                     searchBottom={false}
                />
                </CardContent>
                </Card>
              </Box>
            </Container>
          </Page>
          :""}</div>
        );
    }
}

const mapStateToProps = (state) => ({
    service: state.service.service,
    isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, {getservice})(ListOwner);
