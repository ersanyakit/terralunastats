
import React, {useState, useEffect, useRef} from 'react'
import useInterval from "../../hooks/useInterval";
import {useWeb3React} from "@web3-react/core";


const STATUS = {
    STARTED: 'Started',
    STOPPED: 'Stopped',
}

const INITIAL_COUNT = 120

const twoDigits = (num) => String(num).padStart(2, '0')

const timeConverter = (UNIX_timestamp:number) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}
export const WaitComponent = (props: {limitUpdate:number,timeLeft:number,hide})=> {
    const [secondsRemaining, setSecondsRemaining] = useState(props.timeLeft)
    const [status, setStatus] = useState(STATUS.STARTED)
    const secondsToDisplay = secondsRemaining % 60
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
    const minutesToDisplay = minutesRemaining % 60
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60

    const { account,chainId, library } = useWeb3React()


    useInterval(
        () => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1)
            } else {
                setStatus(STATUS.STOPPED)
                props.hide();
            }
        },
        status === STATUS.STARTED ? 1000 : null,
        // passing null stops the interval
    )


    return (

        (account === null) || (!account) ?
            <>
                    <div className={"text-center"}>
                        <h3 className={"text-success"}>Connect or Wait...</h3>
                        <h4 className={"text-danger"}>{twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}</h4>
                        <h5>{timeConverter(props.limitUpdate)}</h5>
                    </div>
            </> :
            <>
                <div className={"text-center"}>
                    <h3 className={"text-success"}>Get Premium or Wait...</h3>
                    <h4 className={"text-danger"}>{twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}</h4>
                    <h5>{timeConverter(props.limitUpdate)}</h5>
                </div>
            </>



    );
}
