import React, { Component } from 'react';
import factory from '../ethereum/factory';


class CampaignIndex extends Component {
    
    //assigned to the class itself
    static async getInitialProps(){

         // get all created campaigns from the deployed contract
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
        return {campaigns};
    }

    render(){
        return <div> {this.props.campaigns } </div>;
    }
}

export default CampaignIndex;