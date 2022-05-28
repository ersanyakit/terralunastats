import IPage from "../../interfaces/page";
import React, {useEffect, useState} from "react";
import ITx from "../../interfaces/tx";
import {ethers} from "ethers";
import {numberWithCommas} from "../../utils";
import ILeaderBoard from "../../interfaces/leaderboarditem";

const USTLeaderBoardPage: React.FunctionComponent<IPage> = props => {
    const [transactionData, setTransactionData] = useState<ILeaderBoard[] |null>(null) ;
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
        document.title = props.title + " - Terra $LUNA Burn Machine";
    },[]);

    const fetchTransactions = async () => {
        const data = await fetch(`https://api.terralunastats.com/api/leaderboard/ust`)
            .then(res => res.json())
            .then(res => {
                setTransactionData(res);
                setIsLoaded(true);
            })
    }

    useEffect(()=>{
        if(!isLoaded){
            fetchTransactions();
        }
    },[])

    const TransactionItem = (props:{boardItem:ILeaderBoard}) => {
        return (
            <tr>
                <td><span className={"fw-bolder info text-white"}>{props.boardItem.totalBurns}</span></td>
                <td><a className={"w-100"} target={"_blank"} href={`https://finder.terra.money/classic/address/${props.boardItem.from_address}`}>{props.boardItem.from_address}</a></td>
                <td className={"d-flex align-items-right"}><span className={"fw-bolder info text-white"}>{numberWithCommas(ethers.utils.formatUnits(props.boardItem.totalAmount,6))}</span></td>
            </tr>
        )
    }

    return(
        <div className={"form-bg"}>
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <td>Burns</td>
                        <td>Address</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                {isLoaded && transactionData.map((transactionItem, index) => {
                    return (
                        <TransactionItem key={index} boardItem={transactionItem}/>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
}


export default USTLeaderBoardPage;
