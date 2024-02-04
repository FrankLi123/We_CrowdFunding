import React,{Component} from "react";
import Layout from "../../components/Layout";
import { Card, Button, Form, Input} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {

    state = {
        minimumContribution: ''
    };

    // trigger the creation of a new campaign through event handler
    onSubmit = async (event)=> {
        event.preventDefault();
        
        const accounts = await web3.eth.getAccounts();

        await factory.methods.createCampaign().send({
            from: accounts[0]
        });
    }


    render(){
        return (
            <Layout>
                <h3> Create a New Campaign</h3>
                <Form.Field>
                    <label> Minimum Contribution</label>
                    <Input label="wei" labelPosition="right"
                    value={this.state.minimumContribution}
                    onChange={event => this.setState({minimumContribution: event.target.value})}
                    />
                </Form.Field>
                <Button primary> Create: </Button>
            </Layout>
        )
    }
}

export default CampaignNew;