import React, {Component} from 'react';
import { Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';


class RequestRow extends Component {

    render(){

        const {Row, Cell} = Table;
        // const {id, request} = this.props;
        return(

            <Row>

                <Cell>{this.props.id}</Cell>
                <Cell>{this.props.request.description}</Cell>
                <Cell>{web3.utils.fromWei(this.props.request.value, 'ether')}</Cell>
                <Cell>{this.props.request.recipient}</Cell>
            </Row>
        )
    }
}

export default RequestRow;