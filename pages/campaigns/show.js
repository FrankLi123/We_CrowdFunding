import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Button, Form, Input, Message, Grid} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class CampaignShow extends Component {

    //before compoenent rendered to the screen, run this
    static async getInitialProps(props){

        const campaign = Campaign(props.query.address);

        // get the summary about the current campaign on this page.
        const summary = await campaign.methods.getSummary().call();
        
        console.log(summary);
        
        return {
            address : props.query.address,
            minimumContribution: BigInt(summary[0]).toString(),
            balance: BigInt(summary[1]).toString(),
            requestCount: BigInt(summary[2]).toString(),
            approversCount: BigInt(summary[3]).toString(),
            manager: BigInt(summary[4]).toString()

        };
    }

    renderCardLists(){
        const {
            address,
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        // list for displaying each Card
        const items = [
            {
                header : manager,
                meta: "Address of Manager",
                description: 'Manager created this campaign and can create request to withdraw money',
                style: {overflowWrap: 'break-word'}

            },{

                header: minimumContribution,
                meta:"Minimum Contribution (wei)",
                description:'The least amount of wei to contriute in order to be an approver'
            },
            {
                header: requestCount,
                meta: 'Number of Requests',
                description: 'A request aims to get some money from contract, and such operations must be approved by approvers'
            },
            { // approversCount
                header: approversCount,
                meta : 'Number of Approvers',
                description: 'donater number that have already made the donation'

            },{
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Balance of Campaign (ether)',
                description: 'The amount of money this campaign have currently'
            }
        ];
        return  <Card.Group items={items}/>;
    }

    render() {
        return (
            <Layout>
                <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                    {this.renderCardLists()}
            
                    </Grid.Column>

                    <Grid.Column width={6}>
                    <ContributeForm address={this.props.address} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Link route ={ `/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary> View Request</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
                
                </Grid>
                
            </Layout>
        )
        //    <Card.Group items={items}/>
        
    }
}

export default CampaignShow;