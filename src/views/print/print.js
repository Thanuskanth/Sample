

import NavBar  from './navbar.component';
import NavBarcolor  from './color';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

 const  Example = () => {
  const componentRef = useRef();
 
 
  window.onafterprint = function(){
 }
  return (
   <div >
     <NavBarcolor   />
     <NavBar   />

   </div>
     
    
  );
};
export default   Example;