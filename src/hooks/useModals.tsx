import Modal from "../Components/Modal";
import React, { useState } from 'react'
import {AnimationHeader} from "../Components/AnimationHeader";
import { QRCode } from 'react-qrcode-logo';
import {Network} from "../Components/Network";
import {DepositButton} from "../Components/DepositButton";
import {Spinner} from "../Components/Spinner";
import {WaitComponent} from "../Components/WaitComponent";
import {useWeb3React} from "@web3-react/core";

export default function useModal(initialValue: boolean = false) {
    const [state, setState] = useState(initialValue)
    const toggle = () => setState(state => !state)
    return { state, toggle }
}

export const ModalNoProvider = ({ isShowing, hide }) => {
    return (
        <Modal header={"No Web3 Provider Found!"} isShowing={isShowing} hide={hide} closable={true}>
            <div className={"modal-body"}>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <div className='text-center mb-3'>
                        <img className={"img-fluid w-100"} src={"/images/metamask.svg"} />
                    </div>
                    <p className='text-center'>
                        No Web3 browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.
                    </p>
                    <a className={"actionBtn"} target='_blank' onClick={hide} href='https://metamask.io/download.html'>
                        <span>Install MetaMask</span>
                    </a>
                </div>
            </div>
        </Modal>
    )
}

export const ModalLoading = ({ isShowing, hide,text,isClosable }) => {
    return (
        <Modal header={"Please Wait!"} isShowing={isShowing} hide={hide} closable={isClosable}>
            <div className={"modal-body"}>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <div className='text-center py-5'>
                        <Spinner color={"#E56AB3"} />
                    </div>
                    <p className='text-center'>
                        Please Wait!
                    </p>
                    <small className='text-center'>
                        {text}
                    </small>

                </div>
            </div>
        </Modal>
    )
}





export const ModalShowWallet = ({ isShowing, hide,address,isClosable }) => {
    return (
        <Modal header={"Donate & Save Terra $LUNA"} isShowing={isShowing} hide={hide} closable={isClosable}>
            <div className={"modal-body"}>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                   <div className={"row"}>
                       <div className={"col-12 d-flex align-items-center justify-content-center"}>
                           <QRCode bgColor={"transparent"} size={160} enableCORS={true} logoWidth={40} logoHeight={40} qrStyle={"squares"} logoImage={"/images/luna.svg"} fgColor={"#0c3694"} eyeRadius={5} value={address} />
                       </div>
                       <div className={"col-12 d-flex flex-column align-items-center justify-content-center"}>
                           <Network/>
                       </div>
                   </div>
                </div>
            </div>
        </Modal>
    )
}

export const ModalConnect = ({ isShowing, hide,address,isClosable }) => {
    return (
        <Modal header={""} isShowing={isShowing} hide={hide} closable={isClosable}>
            <div className={"modal-body"}>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <div className='text-center py-5'>
                        <QRCode bgColor={"transparent"} size={200} enableCORS={true} logoWidth={50} logoHeight={50} qrStyle={"dots"} logoImage={"/assets/images/roco.svg"} fgColor={"#000000"} eyeRadius={1} value={address} />,
                    </div>

                    <p>{address}</p>
                    <button className={"btn btn-light btn-md"} onClick={()=>{
                        navigator.clipboard.writeText(address);
                        hide();
                    }
                    }>
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        </Modal>
    )
}


