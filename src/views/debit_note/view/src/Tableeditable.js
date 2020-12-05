import React from 'react';
import GenerateRows from './GenerateRows';
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { getItem } from '../../../../actions/itemaction'
import { addinvoicedec, adddisc, } from '../../../../actions/itemdescription'
import { deletecurent } from '../../../../actions/invoiceacttion'
import { getpropac } from '../../../../actions/program_package'
import { connect } from 'react-redux';
import { ImTab } from 'react-icons/im';
import { getinvoice, updateinvoice } from '../../../../actions/invoiceacttion'
import { ThreeSixtySharp } from '@material-ui/icons';
import { removeFromStorage, setInStorage, getFromStorage } from "../../../../storage/index"
import { adddebit, deletedebitcurent, updatedebit } from '../../../../actions/debitaction';
import { adddebitdec, updatedebitdec } from '../../../../actions/debitdescription';
import {header} from '../../../../actions/authaction'; 
import Print from '../../../print/debit/sample'; 
import axios from 'axios';
class Table extends React.PureComponent {
  componentDidMount() {


      axios.get('http://localhost:8080/debit/debit_des/' + this.props.id, header(getFromStorage("auth"))).then(res => {
      setInStorage("debitdet",res.data)

      this.setState({

       
        debit:res.data.debitnote.debit_description,
        debitdes:res.data.debitnote,
        show:true

      })
    })


  }




  getRowList = () => {
    const rows = {
      id: 1,
      item: '',
      detail: 20,
      amount: 0,
      count: 1,
      total_amo: 0,

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
    savebut: "",
    show: false,
    id: "",
    debit:[],
    debitdes:[],

  }

  onSubmitinvoicedec = (e) => {


    // console.log("this.state.role", this.state.role)
    // setInStorage("program",this.props.curentinvoice); 
    // if (this.state.but == "GENERETE") {

    e.preventDefault();
    const data = this.state.rows.map(row => {
      return {
        debitnoteId: this.props.curent.id,
        description: row.item,
        amount: row.total_amo,

      }

    })

    data.map(row => {

      this.props.adddebitdec(row);

    })

    const newamount = {
      id: this.props.curent.id,
      total: this.getTotal()

    }
    this.props.updatedebit(newamount)

    this.props.deletedebitcurent()
    this.setState({
      savebut: "none",
      isprint: !this.state.isprint
    })


    // this.props.deletecurent();
    



  }



  onSubmitUpdatereceipt = (e) => {
    e.preventDefault();
    const data = this.state.rows.map(row => {
      return {
        debitnoteId: this.props.curent.id,
        description: row.item,
        amount: row.total_amo,

      }

    })

    data.map(row => {

      this.props.updatedebitdec(row);

    })
    this.setState({
      but: "EDIT",
      isprint: !this.state.isprint
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
  ongetAmount() {
    this.props.program_package.filter((obj => obj.program == this.props.curentinvoice.program && obj.pac == this.props.curentinvoice.package)).map(x => {
      this.setState({
        pac_amm: x.amount
      })
    })
  }

  onChangeamo = (e) => {
    // alert((e.target.value))
    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)
        return Object.assign(el, { total_amo: parseInt(e.target.value).toFixed(2) })
      return el
    });
    this.setState({ rows: newData });
    console.log(this.state.rows, "stateroes")

  }
  onChangeRowPrice(id) {
    const item_data = this.props.item.map(item => {
      return {

        program: item.item_name,
        pac: item.detail,
        amount: item.amount,

      }

    })
    const finaldata = this.props.program_package.concat(item_data)
    const dat = this.state.rows.find(x => x.id == id)
    if (finaldata.filter((obj => obj.program == dat.item && obj.pac == dat.detail)).length == 0) {
      var newData = this.state.rows.map(el => {
        if (el.id == id)
          return Object.assign(el, { amount: 0, total_amo: 0 })
        return el
      });
      this.setState({ rows: newData });
    }
    else {
      finaldata.filter((obj => obj.program == dat.item && obj.pac == dat.detail)).map(data => {
        var newData = this.state.rows.map(el => {
          if (el.id == id)
            return Object.assign(el, { amount: data.amount, total_amo: data.amount })
          return el
        });
        this.setState({ rows: newData });

      })

    }



  }

  onSelectprice = (e) => {

    return this.props.program_package.filter((obj => obj.program == e.target.id && obj.pac == e.target.value)).map(x => {

      return x.amount
    })

  }
  onSelectitem = (e) => {


    this.state.rows.filter(x => x.id == e.target.id).map(x => { x.item = e.target.value })
    console.log(this.state.rows)
    this.onChangeRowPrice(e.target.id)
  }
  onSelectdiscription = (e) => {
    // alert("des")
    this.state.rows.filter(
      x => x.id == e.target.id

    ).map(
      x => { x.detail = e.target.value })
    console.log(this.state.rows)
    this.onChangeRowPrice(e.target.id)

  }
  onSelectqty = (e) => {

    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)


        return Object.assign(el, { total_amo: (e.target.value) * (el.amount) })
      return el
    });
    this.setState({ rows: newData });
    // console.log(newData,"e target")
    //    
  }

  onSelectamount = (e) => {
    this.state.rows.filter(
      x => x.amount == e.target.id

    ).map(
      x => { x.item = e.target.value })
  }
  getRows = () => {
    return this.state.rows.map((row) => {
      return (<div>
        <tr class="d-flex ">
          <td class=" col-9">
            <div class="row ">
              <div class=" col-8">
                <select class="custom-select" required id={row.id} disabled={!this.props.iscurent} value={row.item} onChange={this.onSelectitem}  >
                  <option >{row.item}</option>
                  {this.props.program_package.map((item) => (
                    <option value={item.program}>{item.program}</option>
                  )
                  )
                  }
                  {this.props.item.map((item) => (
                    <option value={item.item_name}   >{item.item_name}</option>
                  )
                  )
                  }

                </select>
              </div>

            </div>


          </td>


          <td class=" col-3">


            <div class="form-group  ">

              <input type="number" disabled={!this.props.iscurent} class="form-control " style={{ textAlign: "right" }} value={(this.state.rows.find(x => x.id == row.id).total_amo)} onChange={this.onChangeamo} id={row.id} />
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
        item: 'Daily work',
        detail: 20,
        amount: 0,
        count: 1,
        total_amo: 0,
        but: "GENERETE",
        savebut: ""
      }
    ]
    this.setState({ num: this.state.num + 1 })
    this.updateRows(rows);

  }

  getTotal = () => {
    return this.state.rows.reduce((count, { total_amo }) => count + parseInt(total_amo), 0);
    // return parseInt(data ).toFixed(2);
  }

  removeRow = (id) => {
    console.log(this.state.rows, "this.init rows")

    const rows = this.state.rows.filter(x => x.id != id);
    console.log(rows, "this.rows")
    this.setState({
      rows: rows
    })

  }



  toggleGenerateRowsModal = () => {
    this.setState({
      showGenerateRowsModal: !this.state.showGenerateRowsModal
    });
  }

  hideGenerateRowsModal = () => {
    this.setState({
      showGenerateRowsModal: false
    });
  }

  onGenerateRows = (rows) => {
    this.updateRows([
      ...this.state.rows,
      ...rows
    ]);
  }

  updateRows = (rows) => {
    this.setState({ rows });
    localStorage.setItem('rows', JSON.stringify(rows));
    this.props.onUpdateState();
  }

  render() {


    console.log(this.state.pac_amm, "staterow")


    return (
      <div class="amount">
        <form onSubmit={this.onSubmitinvoicedec}>
          <table class=" table-bordered">
            <thead>
              <tr class="d-flex">
                <th class="col-9" >DESCRIPTION</th>
                {/* <th class="col-2">QTY</th> */}
                <th class="col-3">AMOUNT</th>

              </tr>
            </thead>
            <tbody>
{
  this.state.debit.map(data=>{
    return(
    <tr class="d-flex ">
          <td class=" col-9">
            <div class="row ">
              <div class=" col-8">
               {data.description}
              </div>

            </div>


          </td>


          <td class=" col-3">


            <div class="form-group  ">
            {parseInt(data.amount).toFixed(2)}
            </div>

            
          </td>
        </tr>
    )
  })
}
     

            </tbody>
          </table>
          <div className='Total'>
            <div class="container">
              <div class="row">
                <div class="col-2 pt-2">
                  {/* <button
                    disabled={!this.props.iscurent}
                    type="button" class="btn btn-success left"
                    onClick={this.addRow}><AiOutlinePlus /></button> */}
                </div>
                <div class="col-4">

                </div>
                <div class="col-6 ">
                  <div class="row">
                    <div class="col-6 tableTotal">
                      Total
    </div>
                    <div class="col-6 totalamount">
                      <span className='total-number'>{parseInt(this.state.debitdes.total).toFixed(2)}</span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=''>

          </div>

          {this.state.showGenerateRowsModal && (
            <GenerateRows
              hideGenerateRowsModal={this.hideGenerateRowsModal}
              onGenerateRows={this.onGenerateRows}
              onUpdateState={this.props.onUpdateState}
            />
          )}
          <div class="row justify-content-between" style={{ marginTop: 30 }}>
            <div class="col-4">

            </div>
            <div class="col-4">
              {/* <a href="/print_debit"><button type="button" class="btn btn-lg btn-primary btn-block print"  >print</button></a> */}
  
  {this.state.show?
  <Print/>
  :"" }
            </div>
          </div>

        </form>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  item: state.item.item,
  iscurent: state.debit.iscurent,
  curentinvoice: state.invoice.curentinvoice,
  curent: state.debit.curent,
  program_package: state.program_package.program_package,

  // isauthendicate:state.auth.isauthendicate

})
export default connect(mapStateToProps, { deletedebitcurent, updatedebitdec, getpropac, getItem, addinvoicedec, adddebitdec, updateinvoice, adddebit, adddisc, deletecurent, updatedebit })(Table);


