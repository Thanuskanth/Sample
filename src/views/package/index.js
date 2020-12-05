import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import {getPackage} from '../../actions/packageaction';
import { Card ,CardContent,Box,Container} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Update from './update';
import{ getFromStorage,setInStorage} from "../../storage/index"

class ListPackage extends Component {
componentDidMount(){
          this.props.getPackage();
          }

    render() {
      const auth= getFromStorage("isauthendicate"); 
      this.props.package.package.sort(function(a, b) {
        var keyA =a.id,
          keyB = b.id;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
        const packagedata=this.props.package.package.map(pac=>
                {      
                  return{
                    name:pac.package_name,
                     
                      
                      action:<Update id={pac.id}/>
                      }
    
                });

        const data = {
            columns: [
                {
                    label: 'PackageName',
                    field: 'name',
                   
                    width: 150
                },
                
               
                {
                    label: 'Action',
                    field: 'action',
                    
                    width: 200
                }


            ],
            rows: 
            packagedata
                
        };


        return (
          <div>
          { auth ?
            <Page
            
            title="Customers"
          >
            <Container maxWidth={false}>
              <Toolbar data={"Package"} /> 
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
                    :""}</div>

        );
    }
}

const mapStateToProps = (state) => ({
  package: state.package,
    isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, {getPackage})(ListPackage);
