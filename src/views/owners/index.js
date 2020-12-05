import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import {getOwner} from '../../actions/owneraction';
import { Card ,CardContent,Box,Container} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Update from './update';
import{ getFromStorage,setInStorage} from "../../storage/index"

class ListOwner extends Component {

  printChart(){

    var myParameters = window.location.search;// Get the parameters from the current page

    var URL = "http://localhost:3000/print";

    var W = window.open(URL);

    W.window.print(); // Is this the right syntax ? This prints a blank page and not the above URL
   W.window.close();
}

componentDidMount(){
            this.props.getOwner();
            // this.printChart()
          }

    render() {
     
      const auth= getFromStorage("isauthendicate"); 
      this.props.owner.owner.sort(function(a, b) {
        var keyA =a.id,
          keyB = b.id;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
        const ownerdata=this.props.owner.owner.map(owner=>
                {      
                  return{
                   name:owner.owner_name,
                   tag:owner.tag,
                     
                      action:<Update id={owner.id}/>
                      }
    
                });

        const data = {
            columns: [
                {
                    label: 'OwnerName',
                    field: 'name',
                   
                    width: 150
                },
                {
                  label: 'Tag',
                  field: 'tag',
                 
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
            
            title="Owners"
          >
            <Container maxWidth={false}>
              <Toolbar data={"Owner"}/> 
              <Box mt={4} >
              <Card >
             <CardContent >
              <MDBDataTable
               entriesOptions={[5, 20, 25]}
               entries={5}
                      display="inline"
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
    owner: state.owner,
    isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, {getOwner})(ListOwner);
