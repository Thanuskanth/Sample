
import Debit  from './index';
// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';

//  const  Example = () => {
//   const componentRef = useRef();
 
 
//   window.onafterprint = function(){
//    alert("dd...");
//  }
//   return (
//    <div >
//      <Debit ref={componentRef}  />

//    </div>
     
    
//   );
// };
// export default   Example;

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


const Example = () => {
  const componentRef = useRef();
 useReactToPrint({
    // content: () => <Debit  />,
  });

  return (
    <div >
      <Debit  />
      {/* <button >Print this out!</button> */}
    </div>
  );
};
export default   Example;