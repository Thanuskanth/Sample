import React from 'react';
import GenerateRows from './GenerateRows';
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { getItem } from '../../../actions/itemaction'
import { addinvoicedec, adddisc, } from '../../../actions/itemdescription'
import { deletecurent } from '../../../actions/invoiceacttion'
import { getpropac } from '../../../actions/program_package'
import { connect } from 'react-redux';
import { updateinvoice } from '../../../actions/invoiceacttion'
import { setInStorage } from "../../../storage/index"
import Print from '../invoice/create_print';

class Table extends React.PureComponent {
  componentDidMount() {


    this.props.getItem();
    this.props.getpropac();
    this.ongetAmount()


  }



  getRowList = () => {
    const rows = {
      id: 1,
      item: '',
      items: '',
      detail: 20,
      amount: 0,
      count: 1,
      total_amo: 0
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
    data: [],
    show: false,
    servicedata:[]


  }

  onSubmitinvoicedec = (e) => {

    e.preventDefault();


    const finaldata = this.props.program_package.map(data => {
      return {
        program: data.programs.id,
        pac: data.packages.id,
        items: JSON.parse(data.items),
        service: JSON.parse(data.service),
        amount: data.amount,
        ownerId:data.ownerId

      }
    })
    var Serviceitem=[]
 if(Object.keys(this.state.servicedata).length > 0 )
 {
   Serviceitem = this.state.servicedata.map(data => {
    return finaldata.filter((obj => obj.program == this.props.curentinvoice.programId && obj.pac == this.props.curentinvoice.packageId && obj.ownerId == this.props.curentinvoice.ownerId)).map(dat => {
      
      return dat.service.map(d => {


        if (d.id == data.id)
          return Object.assign(d, { detail: data.value })
        return d
      })
    })
  })
  this.setState({
    servicedata: Serviceitem[0],
    show: true
  })
 }
 else
 {
 
     finaldata.filter((obj => obj.program == this.props.curentinvoice.programId && obj.pac == this.props.curentinvoice.packageId && obj.ownerId == this.props.curentinvoice.ownerId)).map(dat => {
      Serviceitem= dat.service
      this.setState({
        servicedata: dat.service,
        show: true
      })
      
     
    })

 }
  
 var itemdata=[]
 if(Object.keys(this.state.data).length > 0 )
 {
   itemdata = this.state.data.map(data => {
    return finaldata.filter((obj => obj.program == this.props.curentinvoice.programId && obj.pac == this.props.curentinvoice.packageId && obj.ownerId == this.props.curentinvoice.ownerId)).map(dat => {
      return dat.items.map(d => {


        if (d.id == data.id)
          return Object.assign(d, { status: data.value })
        return d
      })
    })
  })
  //  console.log(item[0],"itemitemitemitemitem")
  this.setState({
    data: itemdata[0],
    show: true
  })

 }
 else
 {
 
     finaldata.filter((obj => obj.program == this.props.curentinvoice.programId && obj.pac == this.props.curentinvoice.packageId && obj.ownerId == this.props.curentinvoice.ownerId)).map(dat => {
      itemdata=dat.items
      this.setState({
        data: dat.items,
        show: true
      })
      
     
    })

 }
  


    const data = this.state.rows.map(row => {

      const data = {
        description: row.item + "-" + row.detail,
        items: row.items
      }
      return {
        invoiceId: this.props.curentinvoice.id,
        description: JSON.stringify(data),
        service: JSON.stringify(row.service),
        amount: row.total_amo,
        count: row.count,
      }

    })
    const dat = {
      description: this.props.curentinvoice.programs.program_name + "-" + this.props.curentinvoice.packages.package_name,
      items:itemdata
    }
    const val = {
      invoiceId: this.props.curentinvoice.id,
      description: JSON.stringify(dat),
      service: JSON.stringify(Serviceitem),
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
    this.props.updateinvoice(invoice);
    setInStorage("items", total);
    setInStorage("program", invoice);

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
  ongetAmount() {
    this.props.program_package.filter((obj => obj.program == this.props.curentinvoice.program && obj.pac == this.props.curentinvoice.package && obj.ownerId == this.props.curentinvoice.ownerId)).map(x => {
      this.setState({
        pac_amm: x.amount
      })
    })
  }

  onChangeamo = (e) => {
    var newData = this.state.rows.map(el => {
      if (el.id == e.target.id)
        return Object.assign(el, { total_amo: parseInt(e.target.value) })
      return el
    });
    this.setState({ rows: newData });
    // console.log(this.state.rows, "stateroes")

  }
  onChangeRowPri() {

    const finaldata = this.props.program_package.map(data => {
      return {
        program: data.programs.id,
        pac: data.packages.id,
        items: JSON.parse(data.items),
        amount: data.amount,
        ownerId:data.ownerId
        

      }
    })

    return finaldata.filter((obj => obj.program == this.props.curentinvoice.programId && obj.pac == this.props.curentinvoice.packageId && obj.ownerId == this.props.curentinvoice.ownerId)).map(data => {

      return data.items


    })





  }


  onChangeRowPrice(id) {
    const item_data = this.props.item.map(item => {


      if (item.service != null) {
        return {
          program: item.item_name,
          pac: item.detail,
          amount: item.amount,
          items: [],
          service: JSON.parse(item.service),
          ownerId: this.props.curentinvoice.ownerId


        }
      } else {
        return {
          program: item.item_name,
          pac: item.detail,
          items: [],
          service: [],
          amount: item.amount,
          ownerId: this.props.curentinvoice.ownerId


        }
      }

    })
    const finaldata = this.props.program_package.map(data => {
      return {
        program: data.programs.program_name,
        pac: data.packages.package_name,
        items: JSON.parse(data.items),
        amount: data.amount,
        service: JSON.parse(data.service),
        ownerId: data.ownerId


      }
    })
    const final = finaldata.concat(item_data)
    // console.log(final,"finaldatafinaldatafinaldata")
    const dat = this.state.rows.find(x => x.id == id)
    if (final.filter((obj => obj.program == dat.item && obj.pac == dat.detail && obj.ownerId == this.props.curentinvoice.ownerId)).length == 0) {
      var newData = this.state.rows.map(el => {
        if (el.id == id)
          return Object.assign(el, { amount: 0, total_amo: 0, items: [], service: [] })
        return el
      });
      this.setState({ rows: newData });
    }
    else {
      final.filter((obj => obj.program == dat.item && obj.pac == dat.detail && obj.ownerId == this.props.curentinvoice.ownerId )).map(data => {
        var newData = this.state.rows.map(el => {
          if (el.id == id)
            return Object.assign(el, { amount: data.amount, total_amo: data.amount, items: data.items, service: data.service })
          return el
        });
        this.setState({ rows: newData });

      })

    }



  }

  onSelectprice = (e) => {

    return this.props.program_package.filter((obj => obj.program == e.target.id && obj.pac == e.target.value && obj.ownerId == this.props.curentinvoice.ownerId )).map(x => {

      return x.amount
    })

  }
  onSelectitem = (e) => {


    this.state.rows.filter(x => x.id == e.target.id).map(x => { x.item = e.target.value })
    // console.log(this.state.rows)
    this.onChangeRowPrice(e.target.id)
  }
  onSelectdiscription = (e) => {
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



          <td class=" col-7">
            <div class="row ">
              <div class=" col-5">
                <select class="custom-select" required id={row.id} value={(this.state.rows.find(x => x.id == row.id).item)} disabled={this.state.show} onChange={this.onSelectitem}  >
                  <option >none</option>

                  {this.props.program_package.map((item) => (
                    <option value={item.programs.program_name}>{item.programs.program_name}</option>
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
              <div class=" col-5">

                <select class="custom-select" required id={row.id} disabled={this.state.show} value={(this.state.rows.find(x => x.id == row.id).detail)} onChange={this.onSelectdiscription}>
                  <option >none</option>


                  {this.props.program_package.map((item) => (
                    <option value={item.packages.package_name}>{item.packages.package_name}</option>
                  )
                  )
                  }
                  {this.props.item.map((item) => (
                    <option value={item.detail}>{item.detail}</option>
                  )
                  )
                  }
                </select>
              </div>

              <div className="col-5">

              </div>


            </div>
            {
              Object.keys(row.items).length > 0 ?
                <div class="row mt-4 mb-2">
                  <div className="col-2" >

                  </div>
                  <div className="col-4" >

                    ITEMS
      </div>

                </div> : ""

            }

            {row.items.map(data => (
              <div className="row mt-2 ml-4" style={{ textAlign: "left" }}>
                <div className="col-5" >

                  {data.item}
                </div>
                <div className="col-5">

                  {data.detail}
                </div>
                <div className="col-2">
                  <input type="number" required class="form-control " disabled={this.state.show} style={{ textAlign: "right" }} defaultValue={data.status} onChange={this.onSelectitems} id={data.id} data={row.id} aria-describedby="emailHelp" />


                </div>

              </div>

            ))
            }
            {
              Object.keys(row.service).length > 0 ?
                <div class="row mt-4 mb-2">
                  <div className="col-2" >

                  </div>
                  <div className="col-4" >

                    SERVICE
      </div>

                </div> : ""

            }
            {row.service.map(dat => (
              <div className="row mt-2 ml-4" style={{ textAlign: "left" }}>
                <div className="col-5" >

                  {dat.service}
                </div>
                <div className="col-5">
                <input type="number" required class="form-control " disabled={this.state.show} style={{ textAlign: "right" }} defaultValue={dat.detail} onChange={this.onSelectitems} id={dat.id} data={row.id} aria-describedby="emailHelp" />

                  
                </div>
                {/* <div className="col-2">
                  <input type="number" required class="form-control " disabled={this.state.show} style={{ textAlign: "right" }} defaultValue={dat.status} onChange={this.onSelectitems} id={data.id} data={row.id} aria-describedby="emailHelp" />


                </div> */}

              </div>

            ))
            }




          </td>
          <td class=" col-2">
            <div class="form-group  ">

              <input type="number" required class="form-control " disabled={this.state.show} style={{ textAlign: "right" }} defaultValue={1} onChange={this.onSelectqty} id={row.id} aria-describedby="emailHelp" />
            </div>


          </td>

          <td class=" col-3">


            <div class="form-group  ">

              <input type="number" class="form-control " disabled={this.state.show} style={{ textAlign: "right" }} value={(this.state.rows.find(x => x.id == row.id).total_amo)} onChange={this.onChangeamo} id={row.id} />
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

  onSelectitems = (e) => {

    this.state.rows.filter(x => x.id == e.target.getAttribute("data")).map(x => {
      x.items.filter(x => x.id == e.target.id).map(data => {
        data.status = e.target.value

      })
    })


  }
  addRow = () => {
    const rows = [
      ...this.state.rows,
      {
        id: this.state.num,
        item: '',
        items: [],
        service: [],
        detail: 20,
        amount: 0,
        count: 1,
        total_amo: 0,
      }
    ]
    this.setState({ num: this.state.num + 1 })
    this.updateRows(rows);

  }

  getTotal = () => {
    const totalval = this.state.rows.reduce((count, { total_amo }) => count + (total_amo), 0);
    return parseInt(totalval + this.state.pac_amm).toFixed(2);
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
  onSelectFirstitems = (e) => {
    const data = this.state.data.filter(x => x.id != e.target.id)
    const dat = [...data, { id: e.target.id, value: e.target.value }]
    this.setState({
      data: dat
    })
  }
  onSelectServiceitems = (e) => {
    const data = this.state.servicedata.filter(x => x.id != e.target.id)
    const dat = [...data, { id: e.target.id, value: e.target.value }]
    this.setState({
      servicedata: dat
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
    // this.props.onUpdateState();
  }

  render() {

    this.ongetAmount()
    // this.remove()
    console.log(this.state, "state.rowstate.rowstate.row")


    return (
      <div class="amount">
        <form onSubmit={this.onSubmitinvoicedec}>
          <table class=" table-bordered">
            <thead>
              <tr class="d-flex">
                <th class="col-7" >DESCRIPTION</th>
                <th class="col-2">QTY</th>
                <th class="col-3">AMOUNT</th>

              </tr>
            </thead>
            <tbody>
              <tr class="d-flex">

                <td class=" col-7">
                  {this.props.iscurent || this.state.show ?
                    <>
                      <div class="row mb-4">

                        <div class=" col-5">
                          {this.props.curentinvoice.programs.program_name}

                        </div>
                        <div class=" col-5">
                          {this.props.curentinvoice.packages.package_name}

                        </div>
                      </div>




                      <div class="row mt-4 mb-2">
                        <div className="col-2" >

                        </div>
                        <div className="col-4" >

                          ITEMS
                            </div>

                      </div>
                      {this.props.program_package.filter(x => x.programId == this.props.curentinvoice.programs.id && x.packageId == this.props.curentinvoice.packages.id && x.ownerId == this.props.curentinvoice.ownerId ).map(x => {
                        return JSON.parse(x.items).map(dat => {
                          return <div className="row mt-2 ml-4" style={{ textAlign: "left" }}>
                            <div className="col-2" >

                            </div>
                            <div className="col-4" >

                              {dat.item}
                            </div>
                            <div className="col-4">

                              {dat.detail}
                            </div>
                            <div className="col-2">
                              <input type="number" required class="form-control " disabled={this.state.show} style={{ textAlign: "right" }} defaultValue={dat.status} onChange={this.onSelectFirstitems} id={dat.id} aria-describedby="emailHelp" />


                            </div>

                          </div>
                        })



                      })}
                      <div class="row mt-4 mb-2">
                        <div className="col-2" >

                        </div>
                        <div className="col-4" >

                          SERVICE
                            </div>

                      </div>
                      {this.props.program_package.filter(x => x.programId == this.props.curentinvoice.programs.id && x.packageId == this.props.curentinvoice.packages.id && x.ownerId == this.props.curentinvoice.ownerId ).map(x => {
                        return JSON.parse(x.service).map(dat => {
                          return <div className="row mt-2 ml-4" style={{ textAlign: "left" }}>
                            <div className="col-2" >

                            </div>
                            <div className="col-4" >

                              {dat.service}
                            </div>
                            <div className="col-4">


                            </div>
                            <div className="col-2">
                              <input type="number" required class="form-control " disabled={this.state.show} style={{ textAlign: "right" }} defaultValue={dat.detail} onChange={this.onSelectServiceitems} id={dat.id} aria-describedby="emailHelp" />


                            </div>

                          </div>
                        })



                      })}

                    </>
                    : ""}


                </td>
                <td class=" col-2"></td>
                <td class=" col-3 data">
                  <div class="form-group  ">

                    {this.state.pac_amm}</div>

                </td>
              </tr>
              {this.getRows()}

            </tbody>
          </table>
          <div className='Total'>
            <div class="container">
              <div class="row">
                <div class="col pt-2">
                  <button
                    // disabled={!this.props.iscurent}
                    type="button" class="btn btn-success left"
                    onClick={this.addRow}><AiOutlinePlus /></button>
                </div>
                <div class="col">

                </div>
                <div class="col  ">
                  <div class="row">
                    <div class="col-5 tableTotal">
                      Total
    </div>
                    <div class="col-7 totalamount">
                      <span className='total-number'>{(this.getTotal())}</span>
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
            // onUpdateState={this.props.onUpdateState}
            />
          )}
          <div class="row justify-content-between" style={{ marginTop: 30 }}>
            <div class="col-4">
              <button type="submit" class="btn btn-lg btn-primary btn-block print" display={this.props.savebut} disabled={!this.props.iscurent} >Save</button>

            </div>
            <div class="col-4">
              <Print id={this.props.curentinvoice.id} />
            </div>
          </div>

        </form>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  item: state.item.item,
  iscurent: state.invoice.iscurent,
  curentinvoice: state.invoice.curentinvoice,
  curent: state.invoicedescription.curent,
  program_package: state.program_package.program_package,


})
export default connect(mapStateToProps, { getpropac, getItem, addinvoicedec, updateinvoice, adddisc, deletecurent })(Table);


