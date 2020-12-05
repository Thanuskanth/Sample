import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { getpropac } from '../../actions/program_package';
import { Card, CardContent, Box, Container } from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Update from './updat';
import { getFromStorage, setInStorage } from "../../storage/index"

class ListItem extends Component {
  
  componentDidMount() {
    this.props.getpropac();
  }

  render() {
    const auth = getFromStorage("isauthendicate");
    this.props.propac.sort(function(a, b) {
      var keyA =a.id,
        keyB = b.id;
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    
    const itemdata = this.props.propac.map(item => {
      return {
        program: item.programs.program_name,
        package: item.packages.package_name,
        amount: item.amount,
        owner: item.owners.owner_name,


        action: <Update id={item.id} />
      }

    });

    const data = {
      columns: [
        {
          label: 'Program',
          field: 'program',

          width: 370
        },
        {
          label: 'Package',
          field: 'package',

          width: 370
        },
        {
          label: 'Owner',
          field: 'owner',

          width: 100
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
              <Toolbar data={"Pragram Package"} />
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
  propac: state.program_package.program_package,
  isauthendicate: state.auth.isauthendicate

})
export default connect(mapStateToProps, { getpropac })(ListItem);
