import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { RiBillLine } from "react-icons/ri";
import ViewDebit from '../../debit_note';
import Debit from '../../debit_note/src/creaate';
import Swal from 'sweetalert2'
import { getinvoicedec } from '../../../actions/itemdescription';
import { getdebit } from '../../../actions/debitaction';
import { removeFromStorage } from "../../../storage"
import { Pencil } from 'react-bootstrap-icons';

class UpdateCustomer extends Component {
  state = {
    
    modeldebit: false,
    modeldebitdet: false,
    amount: false



  }

  componentDidMount() {
    this.props.getinvoicedec()
    if (this.props.amount > 0) {
      this.setState({
        amount: true
      })
    }

  }
  ontoggleDebit = () => {
    this.setState({
      modeldebit: !this.state.modeldebit
    })
  
  }
  ontoggleDebitDet = () => {
    this.props.getdebit()
    this.setState({
      modeldebitdet: !this.state.modeldebitdet
    })
  }
 
  render() {


    const { modeldebit, modeldebitdet } = this.state;
    return (
      <div >
        {this.props.data ?
          <div>
            <RiBillLine color="blue" size={20} className="mr-3" onClick={this.ontoggleDebit} />
            <Pencil color="green" size={20} className="mr-3" onClick={this.ontoggleDebitDet} />
          </div>

          :
          <RiBillLine color="blue" size={20} className="mr-3" onClick={this.ontoggleDebit} />

        }

        <Modal
          show={modeldebit}
          dialogClassName="modal-90w"
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton onClick={this.ontoggleDebit}>
            <Modal.Title id="example-custom-modal-styling-title">
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewDebit id={this.props.id} amount={this.props.amount} />

          </Modal.Body>

        </Modal>
        <Modal
          show={modeldebitdet}
          dialogClassName="modal-90w"
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton onClick={this.ontoggleDebitDet}>
            <Modal.Title id="example-custom-modal-styling-title">
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Debit id={this.props.id} />

          </Modal.Body>

        </Modal>

      </div>
    );
  }
}

export default connect(null, { getinvoicedec, getdebit })(UpdateCustomer);



