import Web3 from "web3";

let web3;

// 2 case: the code will be run twice (one on the browser and another one on the Next server)
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server || the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://sepolia.infura.io/v3/0bc26115df1c4fb98cd9aa4081885505'
  );
  web3 = new Web3(provider);
}

export default web3;
