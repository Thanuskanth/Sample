import React from 'react';
import GenerateRows from './GenerateRows';
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { connect } from 'react-redux';
import {getItem } from '../../actions/itemaction'

// import { addinvoicedec, adddisc, } from '../../actions/itemdescription'
// import { deletecurent } from '../../actions/invoiceacttion'
// import { getpropac } from '../../actions/program_package'
// import { updateinvoice } from '../../actions/invoiceacttion'
// import { setInStorage } from "../../storage"
// import Print from '../invoice/create_print';

class Table extends React.PureComponent {
  componentDidMount() {


    this.props.getItem();
   
    // this.props.getpropac();
    // this.ongetAmount()


  }



  getRowList = () => {
    const rows = {
      id: 1,
      item: '',
      detail: 20,
    
     
      status: 0
    };
    if (rows) {
      try {
        return JSON.parse(rows);
      } catch (err) {
        console.error(err);
        return [];
      }
    }
    return [];
  }

  state = {
    rows: this.getRowList(),
    showGenerateRowsModal: false,
    num: 1,
    item: "",
    detail: "",
    count: 1,
    amount: 0,
    package_detail: "",
    pac_amm: 0,
    isprint: true,
    savebut: ""


  }

  onSubmitinvoicedec = (e) => {

    e.preventDefault();

    const data = this.state.rows.map(row => {
      return {
        invoice: this.props.curentinvoice.id,
        description: row.item + "-" + row.detail,
        amount: row.total_amo,
        count: row.count,
      }

    })
    const val = {
      invoice: this.props.curentinvoice.id,
      description: this.props.curentinvoice.program + "-" + this.props.curentinvoice.package,
      amount: this.state.pac_amm,
      count: 1,
    }
    this.props.addinvoicedec(val);

    data.map(row => {

      this.props.addinvoicedec(row);

    })
    const total = [...data, val]

    this.props.deletecurent();
    const invoice = this.props.curentinvoice;
    invoice.total = this.getTotal();
    console.log(invoice, "invoiceinvoiceinvoice")
    this.props.updateinvoice(invoice);
    

    this.setState({
      isprint: false,
      savebut: "none"


    })



  }

  onChangeRowName = (event, aKey) => {
    const rows = this.state.rows.map((row) => {
      if (row.key === aKey) {
        return {
          ...row,
          name: event.currentTarget.textContent
        }
      }
      return row;
    });
    this.updateRows(rows);
  }

 
  onSelectItem = (e) => {

    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, {  item: e.target.value })
      return el
    });
    this.setState({ rows: newData });

  }
  
 
  onSelectDetail = (e) => {

    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, { detail: e.target.value })
      return el
    });
    this.setState({ rows: newData });

  }
  
 
  onSelectStatus = (e) => {

    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, {  status: e.target.value })
      return el
    });
    this.setState({ rows: newData });

  }
  


 
  getRows = () => {
    return this.state.rows.map((row) => {
      return (<div>
        <tr class="d-flex ">
          <td class=" col-6">
            <div class="row ">
              <div class="col-12 ">
                <select class="custom-select" required id={row.id} value={row.item} onChange={this.onSelectItem}  >
                  <option >none</option>

                  {this.props.item.map((item) => (
                    <option value={item.program}>{item.program}</option>
                  )
                  )
                  }
                 

                </select>
              </div>
             
            </div>


          </td>
          <td class=" col-4">
            <div class="form-group  ">

            <select class="custom-select" required id={row.id} value={row.detail} onChange={this.onSelectDetail}>
                  <option >none</option>


                  {this.props.item.map((item) => (
                    <option value={item.pac}>{item.pac}</option>
                  )
                  )
                  }
                  
                </select>            </div>


          </td>

          <td class=" col-2">


            <div class="form-group  ">

              <input type="number" class="form-control " style={{ textAlign: "right" }} onChange={this.onSelectStatus} id={row.id} />
            </div>

            <div className='controls'>
              <AiOutlineClose
                display={this.state.savebut}

                color="red"
                onClick={() => this.removeRow(row.id)} />
            </div>
          </td>
        </tr>

      </div>
      );
    });
  }

  addRow = () => {
    const rows = [
      ...this.state.rows,
      {
        id: this.state.num,
        item: '',
        detail: 20,
        status: 0,
        
      }
    ]
    this.setState({ num: this.state.num + 1 })
    this.updateRows(rows);

  }


  removeRow = (id) => {
    const rows = this.state.rows.filter(x => x.id != id);
    this.setState({
      rows: rows
    })
  }

  removeRows = () => {
    this.updateRows([]);
  }

 

  updateRows = (rows) => {
    this.setState({ rows });
    localStorage.setItem('rows', JSON.stringify(rows));
  }

  render() {

    return (
      <div class="amount">
        <form onSubmit={this.onSubmitinvoicedec}>
          <table class=" table-bordered">
            <thead>
              <tr class="d-flex">
                <th class="col-6" >ITEM</th>
                <th class="col-4 center">DESCRIPTION</th>
                <th class="col-2">STATUS</th>

              </tr>
            </thead>
            <tbody>
            
              {this.getRows()}

            </tbody>
          </table>
          <div className='Total'>
            <div class="container">
              <div class="row">
                <div class="col pt-2">
                  <button
                    type="button" class="btn btn-success left"
                    onClick={this.addRow}><AiOutlinePlus /></button>
                </div>
               
               
              </div>
            </div>
          </div>
          <div className=''>

          </div>

          <div class="row justify-content-between" style={{ marginTop: 30 }}>
            <div class="center col-4"></div>
            <div class="center col-4">
              <button type="submit" class="btn btn-lg btn-primary btn-block print"  >Save</button>

            </div>
            <div class="col-4">
              
            </div>
          </div>

        </form>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  item: state.item.item,

 


})
export default connect(mapStateToProps, {  getItem })(Table);


