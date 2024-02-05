import React, {Component} from 'react';
import Layout from '../../components/Layout';


class CampaignShow extends Component {

    //before compoenent rendered to the screen, run this
    static async getServerSideProps(props){
        // show one campaign address in this page
        console.log(props.query.address);
        
        return {};
    }

    render() {
        return(
            <Layout>
            <h3>Campaign Show</h3>
            </Layout>
        ) 
    }
}

export default CampaignShow;