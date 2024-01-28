pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimumVal) public {
        address newCampaign = new Campaign(minimum);
    }
}