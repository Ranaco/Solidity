import Web3 from "web3";
import Token from './truffle-build/Token.json'

export const setWeb3 = async () => {
    if(window.ethereum){
        window.web3 = new Web3(window.ethereum);
        try{
            await window.ethereum.enable();
        }catch(err){
            console.log(err);
        }
    } else if(window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
}


export const loadBlockChainData = async (setAdmin, setContract) => {
    let contract;
    const web3 = await window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = await Token.networks[networkId];
    const abi = Token.abi;
    const address = networkData.address;
    if(networkData){
      contract = new web3.eth.Contract(abi, address);
      console.log(contract);
    }
    setContract(contract);
    setAdmin(accounts[0]);
    console.log(networkData);
}