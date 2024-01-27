pragma solidity ^0.4.17;

contract Campaign {

    // Struct - Manager's Request
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    // Storage Variable(s);
    address public manager;
    uint public minimumContribution;
    Request[] public requests;

    mapping(address => bool) public approvers;

    // Modifier that adds to other functions for restriction on functions inside this contract
    modifier restricted() {
        require( msg.sender == manager);
        _;
    }

    function Campaign(uint minimum) public {

        manager = msg.sender;
        minimumContribution = minimum;

    }


    /* Allow donator to contribute to manager's request. */
    function contribute() public payable{
        require(msg.value > minimumContribution);
        // approvers.push(msg.sender);
        approvers[msg.sender] = true;
    }


    /* Manager creates a new request that requires donation */
    function createRequest(uint val, string description, address recipient) public restricted{
        
        require(approvers[msg.sender])
        // variable in Memory(not storage)
        Request memory req = Request({
            description: description,
            value: val,
            recipient: recipient,
            complete: false,
        });
        requests.push(req);
    }









}
