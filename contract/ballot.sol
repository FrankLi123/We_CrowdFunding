pragma solidity ^0.4.17;

contract Campaign {

    // Struct of Manager's Request for Donation
    struct Request{

        string description;

        uint value;

        address recipient;

        bool complete;
    }

    address public manager;

    uint public minimumContribution;

    address[] public approvers;


    function Campaign(uint minimum) public {

        manager = msg.sender;
        minimumContribution = minimum;

    }


    /* Allow donator to contribute to manager's request. */
    function contribute() public payable{

        require(msg.value > minimumContribution);

        approvers.push(msg.sender);
    }


}
