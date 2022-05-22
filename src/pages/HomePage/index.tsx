import IPage from "../../interfaces/page";

import React, {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {useBlockNumber} from "../../state/application/hooks";
import {ethers} from "ethers";

const HomePage: React.FunctionComponent<IPage> = props => {
    const  [totalSupply, setTotalSupply] = useState(0);
    const [circulationSupply, setcirculationSupply] = useState(0);
    const [totalBurnedSupply,setTotalBurnedSupply] = useState(0);
    const [statusBarCount,setStatusBarCount] = useState(0);
    const [recentBurnTxs,setRecentBurnTx] = useState(0);
    const { chainId, library,account } = useWeb3React()
    const [NUM_BLOCKS,SETNUMBLOCKS] = useState(1024);
    const blockNumber = useBlockNumber()

    const fetchCirculationSupply = async () => {
            fetch(`https://fcd.terra.dev/v1/circulatingsupply/luna`)
                .then(res => res.json())
                .then(res => {
                    setcirculationSupply(res);
                })
    }
    const fetchTotalSupply = async () => {
        fetch(`https://fcd.terra.dev/v1/totalsupply/luna`)
            .then(res => res.json())
            .then(res => {
                        setTotalSupply(res);
            })
    }

    const fetchBurnTransactions = async (offset) =>{
        const data = await fetch(`https://fcd.terra.dev/v1/txs?offset=${offset}&limit=100&account=terra1sk06e3dyexuq4shw77y3dsv480xv42mq73anxu`);
        return data ? data.json() : false;
    }

    const fetchBurnedSupply = async () => {
        const offset = 0;
        var fullData = [];
        var lastNext = 1;
        var data = await fetchBurnTransactions(0);
        while(lastNext > 0){
            if (data && data.next && data.next != lastNext){
                lastNext = data.next;
                fullData = fullData.concat(data.txs);
                data = await fetchBurnTransactions(lastNext);
            }else{
                break;
            }
        }
        console.dir(fullData);
        var i = 0;
        var totalBurnedAmount = 0;
        for(i = 0; i < fullData.length ; i++){
            if(fullData[i].tx.value.msg[0].type == "bank/MsgSend"){
                if(fullData[i].tx.value.msg[0].value.amount[0].denom == "uluna"){
                    var szAmount =  fullData[i].tx.value.msg[0].value.amount[0].amount;
                    var formattedAmount = ethers.utils.formatUnits(szAmount,6) ;
                    console.log(formattedAmount);
                    totalBurnedAmount =  totalBurnedAmount + parseFloat(formattedAmount.replace(".",","));
                }
            }
        }

        setTotalBurnedSupply(totalBurnedAmount > 0 ? totalBurnedAmount:0);
        console.log("DONE",totalBurnedAmount)

    }


    const setProgress = value => {
        setStatusBarCount(value);
        document.getElementsByClassName("fillbar")[0].setAttribute("style",`width:${value}%`);
    }

    const incProgress = (step = 15) => {
       setProgress(step);
    }

    const generateBlankSurface = () => {
        const surface = document.querySelector('.surface-scan');
        while (surface.firstChild) {
            surface.removeChild(surface.lastChild);
        }
        for (let i = 0; i < NUM_BLOCKS; i++) {
            var type = ['unused', 'used', 'full'][0];
            const span = document.createElement('span');
            type="unused"
            span.className = `block ${type}`;
            surface.appendChild(span);
        }
    }

    const genSurface = () => {
        const surface = document.querySelector('.surface-scan');
        while (surface.firstChild) {
            surface.removeChild(surface.lastChild);
        }
        console.log(NUM_BLOCKS);
        console.log("BURNED:",totalBurnedSupply);
        console.log("TOTALSUPPLY:",totalSupply);
        console.log("CIRCULATIONSUPPLY:",circulationSupply);

        const ratio = (NUM_BLOCKS * circulationSupply) / totalSupply;
        const burnedRatio = (NUM_BLOCKS * totalBurnedSupply) / totalSupply;
        setProgress(burnedRatio);
        for (let i = 0; i < NUM_BLOCKS; i++) {
            var type = ['unused', 'used', 'full'][0];
            const span = document.createElement('span');
            if(i < ratio){
                if(burnedRatio >= i){
                    type = "bad";
                }else{
                    type = "full";
                }

            }else{
                type="unused"
            }
            span.className = `block ${type}`;
            surface.appendChild(span);
        }
    }

//     const saveTerra = async () => {
//         const stages = document.querySelectorAll('.list span[data-status]');
//
//
//         let currentStage = 0;
//         const cpb = ~~(totalSupply / NUM_BLOCKS);
//
//         const random = (min = 1, max = 6) => min + ~~(Math.random() * max);
//
//         const nextStage = () => {
//             // if (currentStage > 0) {
//             //   const randomFail = random(1, 6);
//             //   stages[currentStage - 1].dataset.status = (randomFail == 4 ? 'fixed' : 'correct');
//             // }
//             //
//             // if (currentStage < stages.length) {
//             //   stages[currentStage++].dataset.status = 'current';
//             //   incProgress();
//             //   setTimeout(nextStage, random(500, 2000));
//             // }
//             // else
//             //   setTimeout(finishStage, random(500, 2000));
//         }
//
// // last Stage from first screen
//         const finishStage = () => {
//             const screen = document.querySelectorAll('.screen-1, .screen-2');
//             screen[0].classList.add('off');
//             screen[1].classList.remove('off');
//             setProgress(0);
//             blocks = document.querySelectorAll('.surface-scan .block');
//             readBlock();
//         }
//
// // Progress bar update
//
//
//         const totalClusters = document.querySelector('.data .total span');
//         const readClusters = document.querySelector('.data .examined span');
//         const badClusters = document.querySelector('.data .badc span');
//
//
//         let badtotalSupply = 0;
//         let currentBlock = 0;
//         let blocks;
//
//
//
//         const readBlock = () => {
//             // let time = 0;
//             // if (blocks[currentBlock].classList.contains('unused'))
//             //   time += random(0, 150);
//             // if (blocks[currentBlock].classList.contains('used'))
//             //   time += random(50, 500);
//             // if (blocks[currentBlock].classList.contains('full'))
//             //   time += random(50, 1000);
//             // time += possibleBadBlock();
//             // if (currentBlock < NUM_BLOCKS)
//             //   setTimeout(readBlock, time);
//             // else
//             //   finishReadBlock();
//             // setProgress(~~((currentBlock / NUM_BLOCKS) * 100));
//             // readClusters.textContent = (currentBlock * cpb).toLocaleString();
//         }
//
//         const finishReadBlock = () => {
//             readClusters.textContent = totalSupply.toLocaleString();
//             document.querySelector('.screen-2').classList.add('off');
//             document.querySelector('.screen-3').classList.remove('off');
//         }
//
//         const possibleBadBlock = () => {
//             // if (random(1, 150) == 1) {
//             //   blocks[currentBlock++].classList.add('bad');
//             //   badClusters.textContent = ++badtotalSupply;
//             //   return random(2000, 4000);
//             // }
//             // else
//             //   blocks[currentBlock++].classList.add('read');
//             //
//             // return 0;
//         }
//
//
//         nextStage();
//
//     }


    const readData = async () => {
        await generateBlankSurface();
        await fetchTotalSupply().then(async () =>{
            await fetchCirculationSupply().then(async () =>{
                await fetchBurnedSupply().then(async ()=>{
                    await genSurface();
                })
            })
        });

    }



    useEffect(()=>{
        readData();

    },[chainId,blockNumber])

    useEffect(()=>{
        document.title = props.title + " - Terra $LUNA Burn Machine";
    },[]);
    return(
        <div>
            <div className="screen-2 ">
                <div className="surface-scan"></div>
                <div className="drive-info">
                    <p>TERRA $LUNA:</p>
                    <ul className="data">
                        <li className="total">{totalSupply} totalSupply</li>
                        <li className="examined">{circulationSupply} circulationSupply</li>
                        <li className="badc">{totalBurnedSupply} burned</li>
                    </ul>

                    <div className={"d-flex align-items-center w-100 text-center my-3"}>
                        <a className="twitter-share-button w-100"
                           target={"_blank"}
                           href={`https://twitter.com/intent/tweet?text=%23TerraLunaStats%20%23lunaburn%0ATotal%20Supply:${totalSupply}%20$LUNA%0ACirculation%20Supply:${circulationSupply}%20$LUNA %0ABurned:${totalBurnedSupply} $LUNA%0A%0Ahttps%3A%2F%2Fterralunastats.com%2F`}
                           data-size="large">
                            <img className={"shareButton"} src={"/images/twitter.svg"}/>
                            Tweet</a>
                    </div>

                    <div className={"d-flex align-items-center w-100 text-center my-3"}>
                        <a className="w-100"
                           target={"_blank"}
                           href={`https://finder.terra.money/mainnet/address/terra1sk06e3dyexuq4shw77y3dsv480xv42mq73anxu`}
                           data-size="large">
                            <img className={"shareButton"} src={"/images/terra.svg"}/>
                            View on Terra Explorer</a>
                    </div>

                    <ul className="legend my-5">
                        <li><span className="block unused"></span> totalSupply</li>
                        <li><span className="block used"></span> some used totalSupply</li>
                        <li><span className="block full"></span> some used circulation Supply</li>
                        <li><span className="block bad"></span> some burned</li>
                    </ul>


                </div>
            </div>
            <div className="screen-3 ">
                <div className="status-bar">
                    <span data-count={statusBarCount.toFixed(5)}>% completed</span>
                    <div className="progressbar">
                        <div className="fillbar"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomePage;
