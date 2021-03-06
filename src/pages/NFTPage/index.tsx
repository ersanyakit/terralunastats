import IPage from "../../interfaces/page";
import React,{useEffect} from "react";
import Background from '../../images/background/forest.webp';

const NFTPage: React.FunctionComponent<IPage> = props => {



    useEffect(()=>{
        document.title = props.title + " - Terra $LUNA Burn Machine";
    },[]);
    return(
       <div className={"container"}>
           <div className={"row"}>
               <div className={"col-12"}>
                   <div className="form-bg">

                    <img style={{width:"250px", height:"250px"}} src={"/images/test.svg"}/>
                   </div>
               </div>
           </div>
       </div>
    )
}


export default NFTPage;
