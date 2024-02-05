import web3 from './web3';
import Campaign from './build/Campaign.json';

// interact with "Application Binary Interface(ABI) of the contract
export default (address)=>{
    return new web3.eth.Contract (
        JSON.parse(Campaign.interface),
    );
};