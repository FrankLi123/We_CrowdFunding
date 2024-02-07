// show list of a request

import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import {Link} from '../../../routes';
import { Card, Button, Table} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {

    static async getInitialProps(props){
        const {address} = props.query;
        const campaign = Campaign(address);

        // get the count number of requests
        const requestCount = await campaign.methods.getRequestsCount().call();

        // get the request array as a struct using JS
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) =>{
                return campaign.methods.requests(index).call();
            })
        );

        console.log(requests);

        return {address, requests};
    }

    // function to render requests into rows
    renderRow(){
        return this.props.requests.map((request, index) =>{
            return(
            <RequestRow
            id={index} 
            key={index} 
            request={request} 
            address={this.props.address}/>
            );
        });
    }


    render(){

        const {Header, Row, HeaderCell, Body } = Table;

        return(
            <Layout>
                <h3> Request List</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                <a>
                    <Button primary> Add Request</Button>
                </a>
                </Link>

                <Table>
                    <Header>
                        <Row> 
                            <HeaderCell> ID</HeaderCell> 
                            <HeaderCell> Description</HeaderCell>
                            <HeaderCell> Amount </HeaderCell>
                            <HeaderCell> Recipient </HeaderCell>
                            <HeaderCell> Approval Count </HeaderCell>
                            <HeaderCell> Approve </HeaderCell>
                            <HeaderCell> Finalize </HeaderCell>
                        </Row>
                    </Header>

                    <Body>
                        {this.renderRow()}
                    </Body>

                </Table>

            </Layout>
        )
    };
};

export default RequestIndex;