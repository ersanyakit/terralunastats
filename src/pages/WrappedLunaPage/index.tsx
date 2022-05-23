import IPage from "../../interfaces/page";
import React, {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {useWormHoleLunaContract, useWrappedLunaContract} from "../../hooks/useContract";
import {formatUnits} from "ethers/lib/utils";
import {BigNumber} from "ethers";
import {Network} from "../../Components/Network";

const WrappedLunaPage: React.FunctionComponent<IPage> = props => {
    const { chainId, library,account } = useWeb3React()
    const wrappedLunaContract = useWrappedLunaContract(chainId,true);

    const [totalSupply,setTotalSupply] = useState("0");
    const [decimals,setDecimals] = useState(0);
    const [contractBalance,setContractBalance] = useState("0");
    const [contractAddress,setContractAddress] = useState("");
    const [name,setName] = useState("");
    const [symbol,setSymbol] = useState("");

    const readData = async () => {



        const _name = await wrappedLunaContract.name();
        console.log("WLUNA",_name);


        const _symbol = await wrappedLunaContract.symbol();
        const _decimals = await wrappedLunaContract.decimals();
        const _totalSupply = await wrappedLunaContract.totalSupply();
        setTotalSupply(formatUnits(_totalSupply,_decimals));
        setDecimals(BigNumber.from(_decimals).toNumber());
        setName(_name);
        setSymbol(_symbol);

        const _contractBalance = await wrappedLunaContract.balanceOf(wrappedLunaContract.address);
        setContractBalance(formatUnits(_contractBalance,_decimals))
        setContractAddress(wrappedLunaContract.address);
        console.log(contractBalance);

    }

    useEffect(()=>{
        readData();
    },[chainId])



    useEffect(()=>{
        document.title = props.title + " - Terra $LUNA Burn Machine";
    },[]);
    return(
        <div className={" form-bg"}>
            <div className={"row"}>
                <div className={"col-6"}>
                    <div className={"col-12 d-flex flex-column align-items-center justify-content-center"}>
                        <Network className={"py-5"}/>
                    </div>
                </div>
                <div className={"col-6"}>
                    <p>Contract Address : {contractAddress}</p>
                    <p>Name : {name}</p>
                    <p>Symbol : {symbol}</p>
                    <p>Total Supply : {totalSupply} $LUNA</p>
                    <p>Contract Balance : {contractBalance} $LUNA</p>
                    <p>Decimals : {decimals}</p>
                </div>
            </div>
        </div>
    )
}


export default WrappedLunaPage;
