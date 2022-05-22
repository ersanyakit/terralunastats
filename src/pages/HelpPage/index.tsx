import IPage from "../../interfaces/page";
import React,{useEffect} from "react";

const HelpPage: React.FunctionComponent<IPage> = props => {

    useEffect(()=>{
        document.title = props.title + " - Terra $LUNA Burn Machine";
    },[]);
    return(
        <div>
            <h1>Help Page</h1>
            <p>Under of development</p>
        </div>
    )
}


export default HelpPage;
