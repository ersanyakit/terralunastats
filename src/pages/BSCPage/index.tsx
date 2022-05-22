import IPage from "../../interfaces/page";
import React,{useEffect} from "react";

const BSCPage: React.FunctionComponent<IPage> = props => {

    useEffect(()=>{
        document.title = props.title + " - Terra $LUNA Burn Machine";
    },[]);
    return(
        <div>

        </div>
    )
}


export default BSCPage;
