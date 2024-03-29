pragma solidity ^0.4.17;
import "./ballot.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;

    /* factory help a manager creates a new campaign */
    function createCampaign(uint minimumVal) public {
        address newCampaign = new Campaign(minimumVal, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    /* get the list of all created campaigns */
    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}
