
const assert = require('assert');
const ganache = require('ganache');
const {Web3} = require('web3');
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
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({from: accounts[0], gas: '1000000'});


    //  call createCampaign() to create a instance of the contract
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

   [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

   campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
   );

});

describe('Campaigns', () => {

    // Check - deploy 2 contracts
    it('deploys a factory and a campaign', () => {
        
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);

    });

    // Check - whoever starts a campaign should be the manager
    if('has caller as the campaign manager', async ()=>{

        // b/c marked manager as 'public' , can have access to it
        const manager = await campaign.methods.manager().call();
        
        assert.equal(accounts[0], manager);

    });

    
    it('enable donation and let them become approvers', async()=>{
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });


    it('check minimum limit on Donation', async ()=>{

        try{
            await campaign.methods.contribute().send({

                value: '5',
                from: accounts[1]
            });
        }catch(err){
            assert(err)
        }
    });


    it('allows a manager to make a payment request', async () => {

        await campaign.methods.createRequest(100, 'Buy tools', accounts[1])
        .send({
            from: accounts[0],
            gas: '1000000'
        });
        const request = await campaign.methods.requests(0).call();
        assert.equal('Buy tools', request.description);
    });


    it('processes requests', async () =>{

        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods.createRequest(web3.utils.toWei('5', 'ether'), 'A', accounts[1]).send({ from: accounts[0], gas: '1000000'});


        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance > 103);
    });
});

