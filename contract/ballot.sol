pragma solidity ^0.4.17;

contract Campaign {

    // Struct - Manager's Request
    struct Request{

        string description;

        uint value;

        address recipient;

        bool complete;
    }

    address public manager;

    uint public minimumContribution;

    address[] public approvers;

    Request[] public requests;


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

        approvers.push(msg.sender);
    }


    /* manager creates a new request that requires donation */
    function createRequest(uint val, string description, address recipient) public restricted{
        Request req = new Request({
            description: description,
            value: val,
            recipient: recipient,
            complete: false,
        });
    }

}
