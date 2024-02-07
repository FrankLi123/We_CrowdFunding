import React, { Component } from 'react';
import { Card, Button, Form, Input, Message, Grid} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import Layout from '../../../components/Layout';
class RequestNew extends Component {


    state = {
        description: '',
        value: '',
        recipient: ''
    };

    static async getInitialProps(props){
        const {address} = props.query;

        return {address};
    }


    onSubmit = async event =>{
        event.preventDefault();
        
        this.setState({loading: true, errorMessage: ''});

        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;

        try{

        // create a new request using the contract function
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                web3.utils.toWei(value, 'ether'), 
                description, 
                recipient
            ).send({from: accounts[0]});

        }catch(err){
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
    }

    render() {
        return (

            <Layout>
                <h3> Create a New Request </h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label> Description</label>
                    <Input 
                    value={this.state.description}
                    onChange ={event =>
                    this.setState({description: event.target.value})}
                    />
                </Form.Field>
                <Form.Field>
                    <label> Value (In Ether) </label>
                    <Input 
                    value={this.state.value}
                    onChange ={event =>
                    this.setState({value: event.target.value})}
                    />
                </Form.Field>
                <Form.Field>
                    <label> Recipient </label>
                    <Input 
                    value={this.state.recipient}
                    onChange ={event =>
                    this.setState({recipient: event.target.value})}
                    />
                </Form.Field>
                <Message
                    error
                    header="Oops, error occured! "
                    content={this.state.errorMessage}
                />
                <Button  loading={this.state.loading} primary> Create !</Button>
            </Form>
            </Layout>
        )
    }
}

export default RequestNew;