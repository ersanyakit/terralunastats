import { Contract } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { getAddress } from '@ethersproject/address'
import detectEthereumProvider from '@metamask/detect-provider'
import {useState} from "react";
import {func} from "prop-types";
import {useWeb3React} from "@web3-react/core";
import { hexStripZeros } from '@ethersproject/bytes'
import { BigNumber } from '@ethersproject/bignumber'

export default function getWeb3Provider(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
}

function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider)
    library.pollingInterval = 12000
    return library
}


export function isAddress(value: any): string | false {
    try {
        return getAddress(value)
    } catch {
        return false
    }
}

export function getSigner(
    library: Web3Provider,
    account: string
): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(
    library: Web3Provider,
    account?: string
): Web3Provider | JsonRpcSigner {
    return account ? getSigner(library, account) : library
}

export function getContract(
    address: string,
    ABI: any,
    library: Web3Provider,
    account?: string
): Contract {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    return new Contract(
        address,
        ABI,
        getProviderOrSigner(library, account) as any
    )
}




interface SwitchNetworkArguments {
    library: Web3Provider
    chainId?: number
}

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
export async function switchToNetwork({ library, chainId }: SwitchNetworkArguments): Promise<null | void> {
    if (!library?.provider?.request) {
        return
    }
    if (!chainId && library?.getNetwork) {
        ;({ chainId } = await library.getNetwork())
    }
    const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString())

    try {
        await library?.provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: formattedChainId }],
        })
    } catch (error) {
        // 4902 is the error code for attempting to switch to an unrecognized chainId
        // @ts-ignore
        if (error.code === 4902 && chainId !== undefined) {
            //const info = CHAIN_INFO[chainId]

            // metamask (only known implementer) automatically switches after a network is added
            // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
            // metamask's behavior when switching to the current network is just to return null (a no-op)
           // await addNetwork({ library, chainId, info })
           // await switchToNetwork({ library, chainId })
        } else {
            throw error
        }
    }
}

export  function addBlockchain(library, network:any,callback) : Boolean {
    let response = false;
    let chainId = network.chainId;
    const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString())


    library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [network],
        }).then(function () {
     })

    switchToNetwork({library:library,chainId:chainId}).then(()=> {
        callback(true);
    }).catch((error: any) => {
        callback(false);
    })
    return false;
}

