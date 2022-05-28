import IPage from "../../interfaces/page";
import React, {useEffect, useState} from "react";
import ITx from "../../interfaces/tx";
import {ethers} from "ethers";
import {numberWithCommas} from "../../utils";

const USTProofPage: React.FunctionComponent<IPage> = props => {
    const [transactionData, setTransactionData] = useState<ITx[] |null>(null) ;
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
        document.title = props.title + " - Terra $LUNA Burn Machine";
    },[]);

    const fetchTransactions = async () => {
        const data = await fetch(`https://api.terralunastats.com/api/transactions/ust`)
            .then(res => res.json())
            .then(res => {
                setTransactionData(res);
                console.dir(res);
                setIsLoaded(true);
            })
    }

    useEffect(()=>{
        if(!isLoaded){
            fetchTransactions();
        }
    },[])

    const TransactionItem = (props:{tx:ITx}) => {
        return (
            <tr>
                <td><span className={"fw-bolder info text-white"}>{props.tx.block}</span></td>
                <td><a className={"w-100"} target={"_blank"} href={`https://finder.terra.money/classic/tx/${props.tx.tx}`}>{props.tx.tx}</a></td>
                <td className={"d-flex align-items-right"}><span className={"fw-bolder info text-white"}>{numberWithCommas(ethers.utils.formatUnits(props.tx.amount,6))}</span></td>
            </tr>
        )
    }

    return(
        <div className={"form-bg"}>
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <td>Block</td>
                        <td>TX</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                {isLoaded && transactionData.map((transactionItem, index) => {
                    return (
                        <TransactionItem key={index} tx={transactionItem}/>
                    );
                })}
                </tbody>
            </table>
        </div>
    )
}


export default USTProofPage;
