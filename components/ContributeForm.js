import React, {Component} from 'react';
import { Card, Button, Form, Input, Message} from 'semantic-ui-react';

class ContributeForm extends Component {
    render(){

        return(


            <Form>
            <Form.Field>
                <label> Amount to Contribute this time: </label>
                <Input label="ether" labelPosition="right"
                />
            </Form.Field>
            <Button primary>
                Contribute !
            </Button>
            </Form>

        );
    }
}

export default ContributeForm;