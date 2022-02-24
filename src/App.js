import React from 'react';
import { useState, useEffect } from 'react';
import { loadBlockChainData, setWeb3 } from './web3.utils';
import './App.css';

const App = () => {

  const load = async () => {
   await setWeb3()
   await loadBlockChainData(setAdmin ,setContract)
  }

  useEffect(() => {
    load();
  }, []);

  const mint  = async () => {
      await contract.methods.mint(enteredAmount, sender).send({from: admin}).once("receipt", async (receipt) =>{
        console.log(receipt);
        const amt = await contract.methods.balanceOf(sender).call();
        console.log(amt);
        setAmount(amt);
        setEnteredAmount("");
        setSender("");
      });
  }
  
    const submitForm = (e) => {
      if(sender.toString === ""){
        alert("Please fill all fields", amount, sender);
      } else {
        e.preventDefault();
        mint();
      }
    }

    const [admin, setAdmin] = useState(null);
    const [sender, setSender] = useState("");
    const [amount, setAmount] = useState(null);
    const [enteredAmount, setEnteredAmount] = useState('');
    const [contract, setContract] = useState(null);

    const handleReciever = (e) => {
      setEnteredAmount(e.target.value);
    }

    const handleSender = (e) => {
      setSender(e.target.value);
    }

  return(
    <div>
      <form onSubmit={submitForm}>
        <input type="text" name={sender} placeholder="Sender's address" value={sender} onChange = {handleSender}/>
        <input type="text" name={enteredAmount} placeholder="Amount" value={enteredAmount} onChange = {handleReciever}/>
        <button type='submit'> Mint </button>
      </form>
      <div>
        {contract && <p> Contract Address: {contract.options.address} </p>}
      </div>
      <div>
        {sender && <p> Sender Address: {sender} </p>}
      </div>
      <div>
        {amount && <p> Amount: {amount} </p>}
      </div>
    </div>
  )
}

export default App;
