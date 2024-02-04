import React from "react";
import {Menu} from 'semantic-ui-react';
import {Link} from "../routes";

export default ()=>{

    return(

        <Menu style={{marginTop: '15px'}}>
        
        {/* generic wrapper component */}
            <Link route="/"> 
                <a className="item">
                CrowdCoin
                </a>
            </Link>

                <Menu.Menu position="right">
            
                <Link route="/"> 
                    <a className="item">
                    Campaign
                    </a>
                </Link>
                   
                <Link route="/campaigns/new"> 
                    <a className="item">
                    +
                    </a>
                </Link>

                </Menu.Menu>
        </Menu>
    )
}