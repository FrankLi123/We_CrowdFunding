pragma solidity ^0.4.17;

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


contract Campaign {

    // Struct - Manager's Request
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals; // list of who has voted on this reqquest
    }

    // Storage Variable(s);
    address public manager;
    uint public minimumContribution;
    Request[] public requests;        // list of requests that the manager has created
    mapping(address => bool) public approvers; // list of addresses for every person who has donated money
    uint public approversCount;


    // Modifier that adds to other functions for restriction on functions inside this contract
    modifier restricted() {
        require( msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }


    /* Allow a donator to contribute to manager's request. */
    function contribute() public payable{
        require(msg.value > minimumContribution);
        // approvers.push(msg.sender);
        approvers[msg.sender] = true;
        approversCount++;
    }


    /* Manager creates a new request that requires donation */
    function createRequest(uint val, string description, address recipient) public restricted{

        // require(approvers[msg.sender]);
        
        // variable in Memory(not storage)
        Request memory req = Request({
            description: description,
            value: val,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(req);
    }

    /* Let a donator approves one request from the manager */
    function approveRequest(uint index) public{

        Request storage request = requests[index]; // aim to make change to storage rather than memory

        require(approvers[msg.sender]);
        
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;  // mark the 
        
        request.approvalCount++;
    }


    /* finalize a request once the approvalCount passes a threshold */
    function finalizeRequest(uint index) public restricted {
    
        Request storage request = requests[index]; //looking for the copy request in storage
        // verify if the number of approvals on this request is over half.
        require(request.approvalCount > (approversCount / 2));
        
        require(!request.complete);
        // transfer the donation to the recipient
        request.recipient.transfer(request.value);
        request.complete = true;
    }

}
