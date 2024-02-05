import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Button, Form, Input, Message} from 'semantic-ui-react';

class CampaignShow extends Component {

    //before compoenent rendered to the screen, run this
    static async getInitialProps(props){

        const campaign = Campaign(props.query.address);

        // get the summary about the current campaign on this page.
        const summary = await campaign.methods.getSummary().call();
        
        console.log(summary);
        
        return {

            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]

        };
    }

    renderCardLists(){
        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        const items = [
            {
                header : manager,
                meta: "Address of Manager",
                description: 'Manager created this campaign and can create request to withdraw money'
            }
        ];
        return  <Card.Group items={items}/>;
    }

    render() {
        return (
            <Layout>
                {this.renderCardLists()}
            </Layout>
        )
        //    <Card.Group items={items}/>
        
    }
}

export default CampaignShow;