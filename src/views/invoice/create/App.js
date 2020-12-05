import React, { useRef } from 'react';
import './Table.css';
import Table from './Table';
import FromTo from './FromTo';
import { getFromStorage } from "../../../storage/index"

class App extends React.PureComponent {

  state = {
    startdate: new Date(),
    modalShow: false,
    modalInvoiceShow: false,
    customer_name: "",
    nic: "",
    address: "",
    phonenumber: "",
    program: "none",
    package: "none",
    date: new Date(),
    amount: "none",
    owner: "none"
  }

  render() {
    const auth = getFromStorage("isauthendicate");

    return (

      <div>
        { auth ?

          <div className="container">


            <div className='App'>

              <div className='page mb-4'>

                <div className="bill">
                  <FromTo />
                  <Table />
                </div>
              </div>
              <div class=" print">
              </div>
            </div>
          </div>

          : ""}</div>

    );
  }
}

export default (App);



