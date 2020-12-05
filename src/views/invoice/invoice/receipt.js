import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { RiBillLine } from "react-icons/ri";
import Receipt from '../receipt/create';
import ReceiptList from '../receipt/index';
import { getinvoicedec } from '../../../actions/itemdescription';
import { removeFromStorage } from "../../../storage"
import { Pencil} from 'react-bootstrap-icons';

class UpdateCustomer extends Component {
  state = {
    
    modelreceipt: false,
    modelreceiptdet: false,
    amount: false



  }

  componentDidMount() {
    this.props.getinvoicedec();
  }

  ontogglereceiptdetail = () => {
    this.setState({
      modelreceiptdet: !this.state.modelreceiptdet
    })
  }
  ontogglereceipt = () => {
    this.setState({
      modelreceipt: !this.state.modelreceipt
    })
    removeFromStorage("receipt")
    removeFromStorage("receiptid")

  }



  render() {
    const { modelreceipt, modelreceiptdet } = this.state;
    return (

      <div >
        {this.props.data ?
          <div>
            <RiBillLine color="blue" size={20} className="mr-3" onClick={this.ontogglereceiptdetail} />
            <Pencil color="green" size={20} className="mr-3" onClick={this.ontogglereceipt} />
          </div>

          :
          <RiBillLine color="blue" size={20} className="mr-3" onClick={this.ontogglereceiptdetail} />

        }
        <Modal
          show={modelreceipt}
          dialogClassName="modal-90w"
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton onClick={this.ontogglereceipt}>
            <Modal.Title id="example-custom-modal-styling-title">
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Receipt id={this.props.id} />

          </Modal.Body>

        </Modal>


        <Modal
          show={modelreceiptdet}
          dialogClassName="modal-90w"
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton onClick={this.ontogglereceiptdetail}>
            <Modal.Title id="example-custom-modal-styling-title">
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReceiptList id={this.props.id} />

          </Modal.Body>

        </Modal>



      </div>
    );
  }
}

export default connect(null, { getinvoicedec })(UpdateCustomer);



