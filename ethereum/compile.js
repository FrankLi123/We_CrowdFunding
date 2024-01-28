const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// delete the 'build' directory
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Read contract .sol files
const campaignPath = path.resolve(__dirname, 'contracts', 'ballot.sol');
const factoryPath = path.resolve(__dirname, 'contracts', 'factory.sol');

const campaignSource = fs.readFileSync(campaignPath, 'utf8');
const factorySource = fs.readFileSync(factoryPath, 'utf8');

// console.log(campaignSource);
const campaignOutput = solc.compile(campaignSource, 1).contracts;
const factoryOutput = solc.compile(factorySource, 1).contracts;

// console.log(factoryOutput);
fs.ensureDirSync(buildPath);

for (let contract in factoryOutput) {
    console.log("Factory Contract:", contract);
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        factoryOutput[contract]
    );
}

for (let contract in campaignOutput) {
    console.log("Campaign Contract:", contract);
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        campaignOutput[contract]
    );
}