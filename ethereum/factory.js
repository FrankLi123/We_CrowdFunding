import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

// get the deployed contract address from the env variable list
const CONTRACTADDRESS = process.env.CONTRACT_ADDRESS;

// try to get the preconfigured factory contract 
const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    CONTRACTADDRESS

);

export default instance;