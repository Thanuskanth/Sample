import {combineReducers} from 'redux';
import customerreducer from './customerreducer';
import ownerreducer from './ownerreducer';
import programreducer from './programreducer';
import packagereducer from './packagereducer';
import itemreducer from './itemreducer';
import invoicereducer from './invoicereducer';
import invoicedescreducer from './invoicedescreducer';
import program_packagereducer from './program_packagereducer';
import authreducer from './authreducer';
import receiptreducer from './receiptreducer';
import debitreducer from './debitreducer';
import debitdescriptionreducer from './debitdescription';
import error from './errorreducer';
import service from './service';
// import debitreducer from './debitdescription';
export default combineReducers({
    customer:customerreducer,
    owner:ownerreducer,
    program:programreducer,
    package:packagereducer,
    item:itemreducer,
    invoice:invoicereducer,
    invoicedescription:invoicedescreducer,
    auth:authreducer,
    receipt:receiptreducer,
    error:error,
    service:service,
    program_package:program_packagereducer,
    debit:debitreducer,
    
    debitdescription:debitdescriptionreducer,
})