import React, { Component } from 'react';
import factory from '../ethereum/factory';


class CampaignIndex extends Compoenent {
    

    // get all created campaigns from the deployed contract
    async componentDidMount(){
        const campaigns = await factory.methods.getDeployedCampaigns().call();
    
        console.log(campaigns);
    }

    render(){
        return <div> Campaigns Index. </div>;
    }
}

export default CampaignIndex;