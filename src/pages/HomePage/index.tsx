import IPage from "../../interfaces/page";

import React, {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {useBlockNumber} from "../../state/application/hooks";
import {ethers} from "ethers";
import {Spinner} from "../../Components/Spinner";
import {numberWithCommas} from "../../utils";
import {QRCode} from "react-qrcode-logo";

const HomePage: React.FunctionComponent<IPage> = props => {
    const  [totalSupply, setTotalSupply] = useState(0);
    const [circulationSupply, setcirculationSupply] = useState(0);
    const [totalBurnedSupply,setTotalBurnedSupply] = useState(0);

    const [price,setPrice] = useState(0);
    const [marketCap,setMarketCap] = useState(0);
    const [volume24h, setVolume24h] = useState(0);
    const [change24h, setChange24h] = useState(0);
    const [lastUpdate,setLastUpdate] = useState(0);

    const [statusBarCount,setStatusBarCount] = useState(0);
    const [recentBurnTxs,setRecentBurnTx] = useState(0);
    const { chainId, library,account } = useWeb3React()
    const [NUM_BLOCKS,SETNUMBLOCKS] = useState(1024);
    const blockNumber = useBlockNumber()

    const [isLoaded,setIsLoaded] = useState(false);



    const fetchTotalAndCirculationSupply = async () => {
        await fetch(`https://api.coingecko.com/api/v3/coins/terra-luna?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
            .then(res => res.json())
            .then(res => {
                setTotalSupply(res.market_data.total_supply);
                setcirculationSupply(res.market_data.circulating_supply);
            })
    }

    const fetchCirculationSupply = async () => {
            await fetch(`https://fcd.terra.dev/v1/circulatingsupply/luna`)
                .then(res => res.json())
                .then(res => {
                    setcirculationSupply(res);
                })
    }
    const fetchTotalSupply = async () => {
        await fetch(`https://fcd.terra.dev/v1/totalsupply/luna`)
            .then(res => res.json())
            .then(res => {
                        setTotalSupply(res);
            })
    }

    const fetchMarketCap = async () => {
        await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=terra-luna&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
            .then(res => res.json())
            .then(res => {
                setMarketCap(res["terra-luna"]["usd_market_cap"]);
                setVolume24h(res["terra-luna"]["usd_24h_vol"]);
                setChange24h(res["terra-luna"]["usd_24h_change"]);
                setPrice(res["terra-luna"]["usd"]);
                setLastUpdate(res["terra-luna"]["last_updated_at"]);
            })
    }

    const fetchBurnedSupply = async () => {
        const data = await fetch(`https://api.terralunastats.com/api/transactions/burned`)
            .then(res => res.json())
            .then(res => {
                setTotalBurnedSupply(res.burned);
            })
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
        setIsLoaded(false);
        await generateBlankSurface();

        await fetchMarketCap().then(async () => {
            await fetchTotalSupply().then(async () =>{
                await fetchCirculationSupply().then(async () =>{
                    await fetchBurnedSupply().then(async ()=>{
                        setIsLoaded(true);
                    })
                })
            });
        })

/*
        await fetchMarketCap().then(async () => {
            await fetchTotalAndCirculationSupply().then(async () =>{
                    await fetchBurnedSupply().then(async ()=>{
                        setIsLoaded(true);
                    })
            });
        })

 */




    }

    useEffect(()=>{
        if(isLoaded){
            genSurface();
        }
    },[isLoaded])



    useEffect(()=>{
        readData();

    },[chainId,blockNumber])

    useEffect(()=>{
        document.title = props.title + " - Terra $LUNA Burn Machine";
    },[]);
    return(
        <div>

            <div className={"row"}>
                <div className={"col-12 d-flex flex-column align-items-center justify-content-center mb-5"}>
                    <h1 className={"text-yellow"}>Terra $LUNA Burn Address</h1>
                    <input className="form-control-lg w-100 text-center" type="text" placeholder=".form-control-lg" value={"terra1sk06e3dyexuq4shw77y3dsv480xv42mq73anxu"}/>
                    <a className={"my-2"}
                       target={"_blank"}
                       href={`https://finder.terra.money/classic/address/terra1sk06e3dyexuq4shw77y3dsv480xv42mq73anxu`}
                       data-size="large">
                        <img className={"shareButton"} src={"/images/terra.svg"}/>
                        View and Verify on Terra Finder</a>
                </div>
            </div>
            <div className="screen-2 ">
                <div className="surface-scan"></div>
                <div className="drive-info">
                    <p>TERRA $LUNA:</p>
                    <ul className="data">

                        <li className="total">{numberWithCommas(totalSupply)} totalSupply</li>
                        <li className="examined">{numberWithCommas(circulationSupply)} circulationSupply</li>
                        <li className="badc fw-bolder">{totalBurnedSupply > 0 ? numberWithCommas(totalBurnedSupply) : <><Spinner color={"#0c3694"} /></> } burned</li>
                        <li><hr/></li>
                        <li className="marketcap">{numberWithCommas(marketCap)} {" USD"}  marketCap</li>
                        <li className="change24h">{change24h} change24h</li>
                        <li className="volume24h">{numberWithCommas(volume24h)} USD volume24h</li>
                    </ul>

                    <div className={"d-flex align-items-center w-100 text-center my-3"}>
                        <a className="twitter-share-button w-100"
                           target={"_blank"}
                           href={`https://twitter.com/intent/tweet?text=%23LunaBurn%0ATotalSupply:${numberWithCommas(totalSupply)}%20$LUNA%0ACirculationSupply:${numberWithCommas(circulationSupply)}%20$LUNA %0ABurned:${numberWithCommas(totalBurnedSupply)} $LUNA%0AMarketcap:$${numberWithCommas(marketCap)}%0AVolume24h:$${numberWithCommas(volume24h)}%0AChange24h:${change24h}%0APrice:$${price}%0A%0Ahttps%3A%2F%2Fterralunastats.com`}
                           data-size="large">
                            <img className={"shareButton"} src={"/images/twitter.svg"}/>
                            Tweet</a>
                    </div>

                    <div className={"d-flex align-items-center w-100 text-center my-3"}>
                        <a className="w-100"
                           target={"_blank"}
                           href={`https://finder.terra.money/classic/address/terra1sk06e3dyexuq4shw77y3dsv480xv42mq73anxu`}
                           data-size="large">
                            <img className={"shareButton"} src={"/images/terra.svg"}/>
                            View on Terra Finder</a>
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
