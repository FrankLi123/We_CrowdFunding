import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card, Button} from 'semantic-ui-react';
import Layout from '../components/Layout';


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
          <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
        <h3> Open Campaigns</h3>
        <Card.Group items={items} />
        <Button content="Create Campaign" icon="add circle" primary/>
      </div>
      </Layout>
    );
  }
   
  export async function getServerSideProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { props: { campaigns } };
  }
  