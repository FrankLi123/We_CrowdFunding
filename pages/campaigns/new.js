import React,{Component} from "react";
import Layout from "../../components/Layout";
import { Card, Button, Form, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {

    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    // trigger the creation of a new campaign through event handler
    onSubmit = async (event)=> {
        event.preventDefault();
        
        this.setState({loading: true});

        try{
            const accounts = await web3.eth.getAccounts();
            
            await factory.methods.createCampaign(this.state.minimumContribution).send({
                from: accounts[0]
            });

        }catch(err){
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
    };

    render(){
        return (
            <Layout>
                <h3> Create a New Campaign</h3>

                <Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
                <Form.Field>
                    <label> Minimum Contribution</label>
                    <Input label="wei" labelPosition="right"
                    value={this.state.minimumContribution}
                    onChange={event => this.setState({minimumContribution: event.target.value})}
                    />
                </Form.Field>
                <Message error header="Opps" content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary> Create </Button>
                </Form>
            
               

            </Layout>
        )
    }
}

export default CampaignNew;