
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach( async() => {

    // get a eth acocunt
    accounts = await web3.eth.getAccounts();

    // deploy the factory contract
    factory = await new web3.eth.Contract(Json.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({from: accounts[0], gas: '1000000'});


    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

});