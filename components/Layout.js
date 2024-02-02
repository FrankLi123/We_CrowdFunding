import React from "react";

export default (props)=>{

    return (

        <div>

            <h1> here is the header</h1>

            {props.children}

            <h1> here is the footer</h1>

        </div>
    )



}