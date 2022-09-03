import React from 'react';
 import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { useWeb3Transfer } from "react-moralis";
import { errorToast, successToast } from "./toastbar";
import "react-toastify/dist/ReactToastify.css";
import { Button, Input } from '@mui/material';

function App() {
  const [contractAddress, setContractAddress] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const { fetch, _, isFetching } = useWeb3Transfer({
    type: "erc1155",
    receiver: receiverAddress,
    contractAddress: contractAddress,
    tokenId: 1,
  });

  const handleTransfer = async () => {
    try {
      await fetch();
      successToast("Transfer Successful");
    } catch (error) {
      errorToast("Transfer Failed");
    }
  };



  return (

    <div className="App">
      <ToastContainer />
      <Input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder="Contract Address" />
      <br />
      <Input value={receiverAddress} onChange={(e) => setReceiverAddress(e.target.value)} placeholder="Reciever Address" />
      <br />
      <Button variant="contained" onClick={() => handleTransfer()} disabled={isFetching}>Transfer</Button>
    </div>
  );
}

export default App;
