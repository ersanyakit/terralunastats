import {useActiveWeb3React} from "../../hooks/web3hooks";
import {ethers} from "ethers";
import {BLOCKCHAINS} from "../../connectors";
import {BigNumber} from "@ethersproject/bignumber";
import {useState} from "react";
import {useWeb3React} from "@web3-react/core";

export const DepositButton = (props: {className:string})=> {

    const { account,chainId, library } = useWeb3React()

    return (
        <>
            <div className="d-grid gap-2">
                <p>Click to here to make deposit and get more erotic minutes!</p>
                <button onClick={()=>{

                    const AVAX_CHAIN = BigNumber.from(BLOCKCHAINS.AVAX.MAIN.chainId).toNumber();//parseInt(BLOCKCHAINS.AVAX.MAIN.chainId);
                    const ETH_CHAIN = BigNumber.from(BLOCKCHAINS.ETH.MAIN.chainId).toNumber();// parseInt(BLOCKCHAINS.ETH.MAIN.chainId);
                    const BSC_CHAIN = BigNumber.from(BLOCKCHAINS.BSC.MAIN.chainId).toNumber();//parseInt(BLOCKCHAINS.BSC.MAIN.chainId);
                    const XDAI_CHAIN = BigNumber.from(BLOCKCHAINS.XDAI.MAIN.chainId).toNumber();//parseInt(BLOCKCHAINS.XDAI.MAIN.chainId);
                    const ETC_CHAIN = BigNumber.from(BLOCKCHAINS.ETC.MAIN.chainId).toNumber();//parseInt(BLOCKCHAINS.ETC.MAIN.chainId);


                    let ethAmount = ethers.utils.parseEther("0.005")
                    let bnbAmount = ethers.utils.parseEther("0.04701572")
                    let avaxAmount = ethers.utils.parseEther("0.29451230")
                    let etcAmount = ethers.utils.parseEther("0.37738722");
                    let xdaiAmount = ethers.utils.parseEther("1.45992981");

                    let amount =  BigNumber.from(0);
                    let bnChainNumber = BigNumber.from(chainId).toNumber();
                    if (AVAX_CHAIN === bnChainNumber){
                        amount =  avaxAmount;
                    } else if (ETH_CHAIN === bnChainNumber){
                        amount = ethAmount;
                    } else if (BSC_CHAIN === bnChainNumber){
                        amount = bnbAmount;
                    }else if (XDAI_CHAIN === bnChainNumber){
                        amount = xdaiAmount
                    }else if (ETC_CHAIN === bnChainNumber){
                        amount = etcAmount;
                    }else{
                        amount = ethers.utils.parseEther("1");
                    }


                    library.getSigner().sendTransaction({
                            to: "0x0bBd14028ee38cD98066aCC0a5a1344511f2948b",
                            value:ethAmount,
                        })

                }} className={props.className + "btn btn-outline-success btn-lg"}>Buy Premium</button>
            </div>
        </>
    );
}
