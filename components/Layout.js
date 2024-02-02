import React from "react";
import Header from './Header';


export default (props)=>{

    return (

        <div>


            {/* <h1> here is the header</h1> */}

            <Header/>

            {props.children}

            <h1> here is the footer</h1>

        </div>
    )



}