import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import getLibrary from './utils/web3Provider'
import {  BrowserRouter, Route, Switch, RouteComponentProps, NavLink } from 'react-router-dom';
import routes from "./config/route";
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector'
import { Web3Provider } from '@ethersproject/providers'
import {NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected} from '@web3-react/injected-connector'
import useModal, {ModalLoading, ModalShowWallet, ModalNoProvider} from "./hooks/useModals"
import {BigNumber} from "@ethersproject/bignumber";
import {BLOCKCHAINS, injected} from './connectors'
import Jazzicon,{jsNumberForAddress} from 'react-jazzicon'

import './App.css';
import { Logo } from './Components/Logo';
import {useEagerConnect, useInactiveListener} from "./hooks/web3hooks";

enum ConnectorNames {
  Injected = 'Injected',
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected
}

const getErrorMessage = (error: Error) => {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
      error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

const App = () => {
  const { state: isNoProvider, toggle: toggleNoProvider } = useModal()
  const { state: isShowWallet, toggle: toggleWalletModal } = useModal()
  const { state: isTimeLockEnabled, toggle: toggleTimeLock } = useModal()

  const context = useWeb3React<Web3Provider>();
  const { connector, library, chainId, account, activate, deactivate, active, error } = context
  const [activatingConnector, setActivatingConnector] = React.useState<any>()

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  React.useEffect(() => {

    if(error){

      if (error instanceof NoEthereumProviderError) {
        toggleNoProvider();
        //return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
      } else if (error instanceof UnsupportedChainIdError) {
        //return "You're connected to an unsupported network."
      } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorFrame
      ) {
        // return 'Please authorize this website to access your Ethereum account.'
      } else {
        //console.error(error)
        //return 'An unknown error occurred. Check the console for more details.'
      }

    }



  }, [error])

  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager || !!activatingConnector)

  const openExplorer =  () => {
    let explorer = "https:/etherscan.io";
    if (BigNumber.from( BLOCKCHAINS.ETH.MAIN.chainId).toNumber() === chainId){
      explorer = BLOCKCHAINS.ETH.MAIN.blockExplorerUrls[0];
    } else if (BigNumber.from( BLOCKCHAINS.BSC.MAIN.chainId).toNumber() === chainId){
      explorer = BLOCKCHAINS.BSC.MAIN.blockExplorerUrls[0];
    } else if (BigNumber.from( BLOCKCHAINS.AVAX.MAIN.chainId).toNumber() === chainId){
      explorer = BLOCKCHAINS.AVAX.MAIN.blockExplorerUrls[0];
    }
    explorer = explorer + "/address/" + account;
    window.open(explorer,"_blank");
    return true;
  }

  const  Account = () => {
    const { account } = useWeb3React()
    return (
        <>
          {account === null
              ? <></>
              : account
                  ? <>
                    <Jazzicon diameter={30} seed={jsNumberForAddress(account)} />
                    <span className={"mx-1 accountAddress"}>{account.substring(0, 6) + "..." + account.substring(account.length - 4)}</span>
                  </>

                  :  <></>}
        </>
    )
  }



  const handleConnect = async () => {
    setActivatingConnector(injected)
    await activate(injected)
  }



  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [])


  return (
    <>
      <BrowserRouter>
      <ModalNoProvider isShowing={isNoProvider} hide={toggleNoProvider} />
      <ModalShowWallet isClosable={true} address={"0x87655081B378d633E8231c4eF02E1a69ba96ab5d"}  isShowing={isShowWallet} hide={toggleWalletModal}  />

      <div className={"container"}>

        <div className="screen">
          <div className="screen-1">
            <Logo className={"logo"} />
            <p className="title">SAVE TERRA $LUNA</p>
            <hr/>
              <p className={"text-center w-100"}>We aim to be a cure to the wounds of millions of $LUNA victims who lost their everything. We will convert your donated coins to $LUNA. <br/>We will burn the $LUNA coin's to reduce circulated supply.</p>
              <div className="button-panel d-flex flex-row flex-wrap">

                {(account === null) || (!account) ?
                    <>
                      <a className={"actionBtn"} onClick={ async ()=> {
                        await handleConnect();
                      }}>
                        <span>Connect</span>
                      </a>
                    </> :

                    <>

                      <button className={"actionBtn"}>
                      <div className={"d-flex align-items-center"} >
                        <Account/>
                      </div>
                      </button>

                    </>
                }

                <NavLink   className={"actionBtn"} to={"/"}>
                  <span className={"nav-link-text"}>Home</span>
                </NavLink>
                <NavLink   className={"actionBtn"} to={"/wormhole"}>
                  <span className={"nav-link-text"}>Worm Hole Bridge</span>
                </NavLink>
                <NavLink   className={"actionBtn"} to={"/wrappedluna"}>
                  <span className={"nav-link-text"}>Wrapped $LUNA</span>
                </NavLink>
                <NavLink   className={"actionBtn"} to={"/transactions"}>
                  <span className={"nav-link-text"}>Transactions</span>
                </NavLink>
                <NavLink   className={"actionBtn"} to={"/donate"}>
                  <span className={"nav-link-text"}>Donate</span>
                </NavLink>
                <NavLink   className={"actionBtn"} to={"/help"}>
                  <span className={"nav-link-text"}>Help</span>
                </NavLink>
                <NavLink   className={"actionBtn"} to={"/about"}>
                  <span className={"nav-link-text"}>About</span>
                </NavLink>
              </div>
          </div>

          <Switch>
            {routes.map((route, index) => {
              return (
                  <Route
                      key={`routeItem${route.name}${index}`}
                      path={route.path}
                      exact={route.exact}
                      render={(props: RouteComponentProps<any>) => (
                          <route.component
                              key={`routeItemComponent${route.name}${index}`}
                              name={route.name}
                              title={route.title}
                              {...props}
                              {...route.props}
                          />
                      )}
                  />
              );
            })}
          </Switch>
        </div>



    </div>
      </BrowserRouter>
     </>
      );
}

export default function() {
  return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>

  )
}

