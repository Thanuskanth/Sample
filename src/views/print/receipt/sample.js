import React, { useState, useEffect } from 'react';
import { removeFromStorage } from "../../../storage/index"

function PaymentConfirmation() {
  const [isLoading, setIsLoading] = useState(true);

  const handleMessage = (event) => {
    if (event.data.action === 'receipt-loaded') {
      setIsLoading(false);
    }
  };

  const printIframe = (id) => {
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id);
    const iframeWindow = iframe.contentWindow ;

    iframe.focus();
    iframeWindow.print();
    // removeFromStorage("receipt")
    // window.location.replace("/app/invoice")

    return false;
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      <iframe
        id="receipt"
        src="/print_receipt"
        style={{ height:0,width:0 }}
        title="Receipt"
      />
      <button type="button" class="btn btn-lg btn-primary btn-block print" onClick={() => printIframe('receipt')}>
        {isLoading ? 'Print' : 'Print Receipt'}
      </button>
    </>
  );
}

export default PaymentConfirmation;