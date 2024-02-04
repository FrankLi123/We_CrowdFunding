import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';

export default function Home({ campaigns }) {
    const items = campaigns.map((item) => {
      return {
        header: item,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });
   
    return (

        <Layout>
      <div>
        <h3> Open Campaigns</h3>
       
        <Link route="/campaigns/new">
            {/* enable traditional right click functionality  */}
            <a>
                <Button floated="right" content="Create Campaign" icon="add circle" primary/>
            </a>
        </Link>
        <Card.Group items={items} />
      </div>
      </Layout>
    );
  }
   
  export async function getServerSideProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { props: { campaigns } };
  }
  