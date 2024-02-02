import React from "react";
import Header from './Header';
import {Container} from 'semantic-ui-react';
import Head from "next/head";

export default (props)=>{

    return (

        <Container>
            
            {/* <Head> - automatically moved the the head tag of HTML documents */}
        <Head> 
          <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
        </Head>
        
        <div>

            <Header/>

            {props.children}

            <h1> here is the footer</h1>

        </div>
        </Container>
    )



}