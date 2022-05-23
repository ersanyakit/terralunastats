import IPage from "../../interfaces/page";
import React,{useEffect} from "react";

const AboutPage: React.FunctionComponent<IPage> = props => {

    useEffect(()=>{
        document.title = props.title + " - Terra $LUNA Burn Machine";
    },[]);
    return(
        <div className={"form-bg"}>
        <div className={"row"}>
            <div className={"col-12 text-center"}>
                <h2>Save Terra $LUNA</h2>
                <hr/>
            </div>
            <div className={"col-lg-6 col-sm-12"}>
                    <h4>TerraLunaStats</h4>
                    <ul>
                        <li>Telegram</li>
                        <ol><a target={"_blank"} href={"https://t.me/terralunastats"}>Join our telegram group</a></ol>
                        <li>Source Code</li>
                        <ol><a target={"_blank"}  href={"https://github.com/ersanyakit/terralunastats"}>Source codes of terralunastats.com</a></ol>
                        <li>Feature Requests</li>
                        <ol><a target={"_blank"}  href={"https://github.com/ersanyakit/terralunastats/issues"}>Click here</a></ol>
                        <li>Follow Developer</li>
                        <ol><a target={"_blank"}  href={"https://twitter.com/ersanyakit"}>ersan.eth</a></ol>
                    </ul>
            </div>

            <div className={"col-lg-6 col-sm-12"}>
                <h4>Special Thanks Goes To</h4>
                <ul>
                    <li><a target={"_blank"}  href={"https://www.coingecko.com"}>CoinGecko</a></li>
                    <li><a target={"_blank"}  href={"https://twitter.com/Dnasc4"}>Dnasc</a></li>
                    <li>Ambroise H(@makrbuildr)</li>
                    <li>Terra Agora Rehabilitation</li>
                    <ol><a target={"_blank"} href={"https://t.me/TerraAgora"}>Join Terra Agora group</a></ol>
                    <li><a target={"_blank"}  href={"https://twitter.com/martkist"}>Martkist</a></li>
                </ul>
            </div>

        </div>
        </div>

    )
}


export default AboutPage;
