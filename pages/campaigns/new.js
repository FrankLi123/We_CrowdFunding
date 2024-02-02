import React,{Component} from "react";
import Layout from "../../components/Layout";
import { Card, Button, Form, Input} from 'semantic-ui-react';

class CampaignNew extends Component {

    state = {
        minimumContribution: ''
    };
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