import React from 'react';
import { header } from '../../../../actions/authaction';
import { getFromStorage, setInStorage } from "../../../../storage"
import axios from 'axios';
import Print from '../../../print/sample';

class Table extends React.PureComponent {

  componentDidMount() {
    axios.get('http://localhost:8080/invoice/' + this.props.id, header(getFromStorage("auth"))).then(res => {
      const data =
        res.data.invoice_description.map(data => {
          return {
            description: JSON.parse(data.description),
            service: JSON.parse(data.service),
            amount: (data.amount),
            count: (data.count),
          }
        }
        )




      this.setState({


        des: data,
        show: true


      })
      setInStorage("items", res.data);

    }

    )

  }

  state = {
    invoice: [],
    des: [],
    show: false


  }

  getTotal = () => {
    const totalval = this.state.des.reduce((count, { amount }) => count + amount, 0);
    return parseInt(totalval).toFixed(2);
  }

  render() {
    console.log(this.state, "this.statethis.statethis.statethis.statethis.statethis.state")
    return (
      <div class="amount">

        <table class=" table-bordered">
          <thead>
            <tr class="d-flex">
              <th class="col-7" >DESCRIPTION</th>
              <th class="col-2">QTY</th>
              <th class="col-3">AMOUNT</th>

            </tr>
          </thead>
          <tbody>




            {this.state.des.map(data => {
              return (

                <tr class="d-flex">

                  <td class=" col-7">
                    <div class="row ">
                      <div class=" col-10" style={{ textAlign: "left" }}>

                        <b> {data.description.description}</b>


                      </div>
                    </div>
                    {
                      Object.keys(data.description.items).length > 0 ?
                        <div class="row mt-4 mb-2">
                          <div className="col-2" >

                          </div>
                          <div className="col-4" >

                            <b>ITEMS</b>
                          </div>
                          <div className="col-6" >

                          </div>
                        </div> : ""

                    }

                    {data.description.items.map(d => {
                      return <div class="row">
                        <div class=" col-2">

                        </div>
                        <div class=" col-4" style={{ textAlign: "left" }}>

                          {d.item}


                        </div>
                        <div class=" col-4" style={{ textAlign: "left" }}>

                          {d.detail}


                        </div>
                        <div class=" col-2" style={{ textAlign: "left" }}>

                          {d.status}


                        </div>
                      </div>
                    })}

                    {
                      Object.keys(data.service).length > 0 ?
                        <div class="row mt-4 mb-2">
                          <div className="col-2" >

                          </div>
                          <div className="col-4" >

                            <b>SERVICE</b>
                          </div>
                          <div className="col-6" >

                          </div>
                        </div> : ""

                    }

                    {data.service.map(d => {
                      return <div div class="row" >
                        <div class=" col-2">

                        </div>
                        <div class=" col-4" style={{ textAlign: "left" }}>

                          {d.service}


                        </div>
                        <div class=" col-4" style={{ textAlign: "left" }}>

                          {d.detail}


                        </div>

                      </div>
                    })}

 


                  </td>
                  <td class=" col-2 data">{data.count}</td>
                  <td class=" col-3 data">

                    {(data.amount).toFixed(2)}</td>
                </tr>
              )

            })}


          </tbody>
        </table>
        <div className='Total'>
          <div class="container">
            <div class="row">
              <div class="col pt-2">

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


        <div class="row justify-content-between" style={{ marginTop: 30 }}>
          <div class="col-4">

          </div>
          <div class="col-4">
            {
              this.state.show ?
                <Print />
                : ""
            }
          </div>
        </div>


      </div>
    );
  }
}

export default (Table);


