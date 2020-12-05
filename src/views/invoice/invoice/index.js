

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { getinvoice } from '../../../actions/invoiceacttion';
import { getreceipt } from '../../../actions/receiptaction';
import { getdebit } from '../../../actions/debitaction';
import { Card, CardContent, Box, Container } from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Update from './update';
import Receipt from './receipt';
import Debit from './debit';
import{ getFromStorage} from "../../../storage"

class ListItem extends Component {
  componentDidMount() {

    this.props.getinvoice();
    this.props.getdebit();
    this.props.getreceipt();

  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  render() {
    
    const auth= getFromStorage("isauthendicate"); 
    this.props.invoice.sort(function(a, b) {
      var keyA =a.id,
        keyB = b.id;
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    
    const itemdata = this.props.invoice.map(invoice => {

      const receipt = this.props.receipt.filter(x => x.invoice_id == invoice.id).reduce((count, { amount }) => count + parseInt(amount), 0);
      const debit = this.props.debit.filter(x => x.invoiceId == invoice.id).reduce((count, { total }) => count + parseInt(total), 0);
      const data=parseInt(invoice.total) - (parseInt(receipt) + parseInt(debit))
      var dat=false;
      if(data>0){
        dat=true
      }
      return {
        id: invoice.owners.tag +" - "+ invoice.id,
        program: invoice.programs.program_name,
        package: invoice.packages.package_name,
        name: invoice.customers.customer_name,
        date:this.convert(invoice.createdAt) ,
        status:invoice.status,
         amount:data,

        
        invoice:<Update id={invoice.id} />,
        receipt:<Receipt id={invoice.id} data={dat}/>,
        debit:<Debit id={invoice.id} data={dat}/>,
      }

    });

    const data = {
      columns: [
        {
          label: 'InvoiceID',
          field: 'id',

          width: 370
        },
        {
          label: 'Program',
          field: 'program',

          width: 370
        },
        {
          label: 'Package',
          field: 'package',

          width: 270
        },

        {
          label: 'CustomerName',
          field: 'name',

          width: 100
        },
        {
          label: 'Date',
          field: 'date',

          width: 100
        },
        {
          label: 'Balance Due',
          field: 'amount',

          width: 100
        },
        {
          label: 'Status',
          field: 'status',

          width: 100
        },
        {
          label: 'Invoice',
          field: 'invoice',

          width: 100
        },
        {
          label: 'Receipt',
          field: 'receipt',

          width: 100
        },
        {
          label: 'Debit',
          field: 'debit',

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
        
        title="Invoice"
      >
        <Container maxWidth={false}>
          <Toolbar data={"Invoice"}/> 
          <Box mt={5} >
          <Card >
         <CardContent>
          <MDBDataTable
           entriesOptions={[5, 20, 25]}
           entries={5}
                 striped
                 hover
                 data={data}
                 responsive
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
  invoice: state.invoice.invoice,
  receipt: state.receipt.receipt,
  debit: state.debit.debit

})
export default connect(mapStateToProps, { getinvoice ,getreceipt,getdebit})(ListItem);
