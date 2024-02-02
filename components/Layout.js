import React from "react";
import Header from './Header';
import {Container} from 'semantic-ui-react';

export default (props)=>{

    return (

        <Container>

        <div>


            <Header/>

            {props.children}

            <h1> here is the footer</h1>

        </div>
        </Container>
    )



}