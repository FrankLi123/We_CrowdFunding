import React, {Component} from 'react';
import { Card, Button, Form, Input, Message} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from 'next/router';

class ContributeForm extends Component {
    
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };
    

    // trigger the creation of new campaign
    onSubmit = async event => {
        event.preventDefault();
        
        // this.setState({loading: true, errorMessage: ''});
        const campaign = Campaign(this.props.address);

        this.setState({loading: true, errorMessage: ''});

        try{
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });

            // refresh the page and see the change
            Router.replaceRoute(`/campaigns/${this.props.address}`)

        }catch(err){
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
    };
        

    render(){

        return(

            <Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
            <Form.Field>
                <label> Amount to Contribute this time: </label>
                <Input label="ether" labelPosition="right"
                value={this.state.value}
                onChange={event => this.setState({value: event.target.value})}
                />
            </Form.Field>
            <Message error header="Opps" content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary>
                Contribute !
            </Button>
            </Form>

        );
    }
}

export default ContributeForm;