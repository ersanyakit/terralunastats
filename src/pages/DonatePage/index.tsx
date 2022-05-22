import IPage from "../../interfaces/page";
import React,{useEffect} from "react";
import {QRCode} from "react-qrcode-logo";
import {Network} from "../../Components/Network";
import {useWeb3React} from "@web3-react/core";
import {formatEther} from "ethers/lib/utils";

const DonatePage: React.FunctionComponent<IPage> = props => {

    const donateAddress = "0x87655081B378d633E8231c4eF02E1a69ba96ab5d";

    function Balance() {
        const { account, library, chainId } = useWeb3React()

        const [balance, setBalance] = React.useState()
        React.useEffect((): any => {
            if (!!account && !!library) {
                let stale = false

                library
                    .getBalance(account)
                    .then((balance: any) => {
                        if (!stale) {
                            setBalance(balance)
                        }
                    })
                    .catch(() => {
                        if (!stale) {
                            // setBalance(1)
                        }
                    })

                return () => {
                    stale = true
                    setBalance(undefined)
                }
            }
        }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

        return (
            <>
                <span className={"fw-bolder"}>Balance </span>
                <span role="img" aria-label="gold">
        💰
      </span>
                <span>{balance === null ? 'Error' : balance ? `Ξ ${formatEther(balance)}` : ''}</span>
            </>
        )
    }

    useEffect(()=>{
        document.title = props.title + " - Terra $LUNA Burn Machine";
    },[]);
    return(
        <div className={"screen-2 d-flex"}>
        <div className='d-flex flex-column align-items-center justify-content-center'>
                <div className={"row"}>
                    <div className={"col-12 d-flex flex-column align-items-center justify-content-center"}>
                        <h1>Donate</h1>
                        <h3>We will buy and we will BURN $LUNA</h3>
                        <h4>Financial donations of any size help fund our mission.</h4>
                    </div>

                    <div className={"col-12 d-flex align-items-center justify-content-center"}>
                        <QRCode bgColor={"transparent"} size={160} enableCORS={true} logoWidth={40} logoHeight={40} qrStyle={"squares"} logoImage={"/images/luna.svg"} fgColor={"#000000"} eyeRadius={5} value={donateAddress} />
                    </div>

                    <div className={"col-12 d-flex align-items-center justify-content-center my-3"}>
                        <Balance/>
                    </div>

                    <div className={"col-12 d-flex align-items-center justify-content-center"}>
                        <input className="form-control-lg w-50 text-center" type="text" placeholder=".form-control-lg" value={donateAddress}/>
                    </div>


                    <div className={"col-12 d-flex flex-column align-items-center justify-content-center"}>
                        <Network className={"py-5"}/>
                    </div>
                </div>
        </div>
        </div>
    )
}


export default DonatePage;
