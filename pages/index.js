import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card } from 'semantic-ui-react';

export default function Home({ campaigns }) {
    const items = campaigns.map((item) => {
      return {
        header: item,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });
   
    return (
      <div>
          <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
        <Card.Group items={items} />
      </div>
    );
  }
   
  export async function getServerSideProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { props: { campaigns } };
  }
  