import React, {useState} from "react";
import {BLOCKCHAINS} from "../../connectors";
import {addBlockchain} from "../../utils/web3Provider";
import useModal, {ModalLoading, ModalNoProvider} from "../../hooks/useModals";
import Jazzicon, {jsNumberForAddress} from "react-jazzicon";
import {BigNumber} from "@ethersproject/bignumber";
import {Web3Provider} from "@ethersproject/providers";
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'

export const Network = (props: {className?:string,testMode?:boolean})=> {
    const [activeNetwork,setActiveNetwork] = useState("0x00");
    const { state: isNoProvider, toggle: toggleNoProvider } = useModal()
    const { state: isLoading, toggle: toggleIsLoading } = useModal()
    const context = useWeb3React()
    const { connector, library, chainId, account, activate, deactivate, active, error } = context

    const selectChain = () => {
        for (const [CHAIN, NETWORKS] of Object.entries(BLOCKCHAINS)) {
            for (const [NETWORK,NETWORK_DATA] of Object.entries(NETWORKS)) {
                if(BigNumber.from(NETWORK_DATA.chainId).toNumber() === chainId){
                    setActiveNetwork(NETWORK_DATA.chainId);
                }
            }
        }
    }

    React.useEffect(() => {
        selectChain();
    }, [chainId])

    function callback(response : Boolean,noProvider : Boolean){
        toggleIsLoading();
        if(!noProvider){
            selectChain();
        }else{
            toggleNoProvider();
        }
    }

    function handleChangeActiveNetwork(index:string){

        if(chainId){
            toggleIsLoading();
            for (const [CHAIN, NETWORKS] of Object.entries(BLOCKCHAINS)) {
                for (const [NETWORK,NETWORK_DATA] of Object.entries(NETWORKS)) {
                    if(BigNumber.from(NETWORK_DATA.chainId).toNumber() === BigNumber.from(index).toNumber()){
                        addBlockchain(library,NETWORK_DATA,callback);
                    }
                }
            }
        }else{
            toggleNoProvider()
        }
    }


    function Networks() {
        return (
            <>
                <div className={ props.className + " network-container"}>
                    <ModalNoProvider isShowing={isNoProvider} hide={toggleNoProvider} />
                    <ModalLoading isClosable={true} isShowing={isLoading} hide={toggleIsLoading} text={"Switching Network..."}/>
                    <div className="network-inner">
                        <div className="chains noselect">
                            <div  onClick={() => {
                                handleChangeActiveNetwork(BLOCKCHAINS.ETH.MAIN.chainId);
                            }} className={activeNetwork === BLOCKCHAINS.ETH.MAIN.chainId ? "active chain":"chain"}>
                                <div className="thumb eth">
                                    <img
                                        src="/images/coins/eth.svg"
                                        alt=""/>
                                </div>
                                <div className="text">
                                    <span>ETH</span>
                                    <small>ETHEREUM</small>
                                </div>
                            </div>
                            <div  onClick={() => {
                                handleChangeActiveNetwork(BLOCKCHAINS.BSC.MAIN.chainId);
                            }} className={activeNetwork === BLOCKCHAINS.BSC.MAIN.chainId ? "active chain":"chain"}>
                                <div className="thumb bsc">
                                    <img
                                        src="/images/coins/bsc.svg"
                                        alt=""/>
                                </div>
                                <div className="text">
                                    <span>BNB</span>
                                    <small>SMART CHAIN</small>
                                </div>
                            </div>

                            <div  onClick={() => {
                                handleChangeActiveNetwork(BLOCKCHAINS.AVAX.MAIN.chainId);
                            }} className={activeNetwork === BLOCKCHAINS.AVAX.MAIN.chainId ? "active chain":"chain"}>
                                <div className="thumb avax">
                                    <img
                                        src="/images/coins/avax.svg"
                                        alt=""/>
                                </div>
                                <div className="text">
                                    <span>AVAX</span>
                                    <small>AVALANCHE</small>
                                </div>
                            </div>

                            <div  onClick={() => {
                                handleChangeActiveNetwork(BLOCKCHAINS.MATIC.MAIN.chainId);
                            }} className={activeNetwork === BLOCKCHAINS.MATIC.MAIN.chainId ? "active chain":"chain"}>
                                <div className="thumb avax">
                                    <img
                                        src="/images/coins/matic.svg"
                                        alt=""/>
                                </div>
                                <div className="text">
                                    <span>MATIC</span>
                                    <small>POLYGON</small>
                                </div>
                            </div>

                            <div  onClick={() => {
                                handleChangeActiveNetwork(BLOCKCHAINS.OE.MAIN.chainId);
                            }} className={activeNetwork === BLOCKCHAINS.OE.MAIN.chainId ? "active chain":"chain"}>
                                <div className="thumb avax">
                                    <img
                                        src="/images/coins/op.svg"
                                        alt=""/>
                                </div>
                                <div className="text">
                                    <span>OP</span>
                                    <small>OPTIMISM</small>
                                </div>
                            </div>

                            <div  onClick={() => {
                                handleChangeActiveNetwork(BLOCKCHAINS.ARB.MAIN.chainId);
                            }} className={activeNetwork === BLOCKCHAINS.ARB.MAIN.chainId ? "active chain":"chain"}>
                                <div className="thumb avax">
                                    <img
                                        src="/images/coins/arb.svg"
                                        alt=""/>
                                </div>
                                <div className="text">
                                    <span>ETH</span>
                                    <small>ARBITRUM</small>
                                </div>
                            </div>

                            <div  onClick={() => {
                                handleChangeActiveNetwork(BLOCKCHAINS.XDAI.MAIN.chainId);
                            }} className={activeNetwork === BLOCKCHAINS.XDAI.MAIN.chainId ? "active chain":"chain"}>
                                <div className="thumb avax">
                                    <img
                                        src="/images/coins/gno.svg"
                                        alt=""/>
                                </div>
                                <div className="text">
                                    <span>GNO</span>
                                    <small>GNOSIS</small>
                                </div>
                            </div>

                            <div  onClick={() => {
                                handleChangeActiveNetwork(BLOCKCHAINS.FTM.MAIN.chainId);
                            }} className={activeNetwork === BLOCKCHAINS.FTM.MAIN.chainId ? "active chain":"chain"}>
                                <div className="thumb avax">
                                    <img
                                        src="/images/coins/ftm.svg"
                                        alt=""/>
                                </div>
                                <div className="text">
                                    <span>FTM</span>
                                    <small>FANTOM</small>
                                </div>
                            </div>


                            <div  onClick={() => {
                                handleChangeActiveNetwork(BLOCKCHAINS.ETC.MAIN.chainId);
                            }} className={activeNetwork === BLOCKCHAINS.ETC.MAIN.chainId ? "active chain":"chain"}>
                                <div className="thumb avax">
                                    <img
                                        src="/images/coins/etc.svg"
                                        alt=""/>
                                </div>
                                <div className="text">
                                    <span>ETC</span>
                                    <small>ETH CLASSIC</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    return (
        <>
            <Networks/>
        </>
    )
}
