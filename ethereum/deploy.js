const HDWalletProvider = require('@truffle/hdwallet-provider');
const {Web3} = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const mnemonic = process.env.MNEMONIC;
console.log(mnemonic);

const provider = new HDWalletProvider(
    mnemonic,
    'https://sepolia.infura.io/v3/0bc26115df1c4fb98cd9aa4081885505'
);
const web3 = new Web3(provider);
const deploy = async () => {
    try{
  const accounts = await web3.eth.getAccounts();

  console.log('Trying to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('deployed to', result.options.address);
  provider.engine.stop();
    }catch(err){
        console.log(err)
    }
};
deploy();
