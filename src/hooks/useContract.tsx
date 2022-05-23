import {useCallback, useState} from 'react'
import { Contract } from '@ethersproject/contracts'
import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getContract } from '../utils/web3Provider'
import {ethers} from "ethers";



import {CONTRACT_ADRESSES} from "../contracts/addresses";
import {BLOCKCHAINS} from "../connectors";
import ERC20_ABI from "../contracts/abis/ERC20.json";



const _testmode = false;
export async function  _userControl()
{
    let status = false;
    if (typeof window.ethereum != 'undefined' && window.ethereum )
    {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const network  = await provider.getNetwork();

        if( network && network.chainId != 43114 && _testmode == false )
        {
            await provider.send( 'wallet_addEthereumChain', [BLOCKCHAINS.AVAX.MAIN]);
            return false;
        }
        await provider.send("eth_requestAccounts", []).then( res => {
            status = true;
        }).catch( err => {
            status = false;
        });

        return status;
    }

    return true;
}

export function _useContract( address: string | undefined, ABI: any )
{

    return useMemo( () => {
        var _address = '';
        let _key     = _testmode ? CONTRACT_ADRESSES.AVAX.FUJI : CONTRACT_ADRESSES.AVAX.MAIN;
        let _rpc     = _testmode ?  BLOCKCHAINS.AVAX.FUJI.rpcUrls[0] :  BLOCKCHAINS.AVAX.MAIN.rpcUrls[0];

        Object.entries(_key).map( item => {
            if( item[0] == address )
            {
                _address = item[1];
            }
        });

        if( !_address ) return false;

        const provider = new ethers.providers.JsonRpcProvider( _rpc );
        return getContract(
            _address,
            ABI,
            provider,
        );
    },[]);
}

export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
    const { library, account } = useWeb3React()

    return useMemo(() => {
        if (!address || !ABI || !library) return null
        try {
            return getContract(
                address,
                ABI,
                library,
                withSignerIfPossible && account ? account : undefined
            )
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
    return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}
export function useERC20Contract() {
    const { account, library } = useWeb3React()
    return useCallback(
        (address, withSignerIfPossible = true) => {
            if (!address || !ERC20_ABI || !library) return null
            try {
                return getContract(
                    address,
                    ERC20_ABI,
                    library,
                    withSignerIfPossible && account ? account : undefined
                )
            } catch (error) {
                console.log('Failed to get the contract:', error)
            }
        },
        [account, library]
    )
}

export function useFindLunaByChainId(chainId) {
    var chainName : string;
    var networkName : string;
    var networkChainId : string;
    var contractInfo : any = null;
    chainName = "";
    networkName = "";
    networkChainId = "";
    Object.entries(BLOCKCHAINS).map(chain => {
        chainName = chain[0];
        Object.entries(chain[1]).map(network => {
            networkName = network[0];
            networkChainId = network[1].chainId;
            if (parseInt(networkChainId) === chainId){
                contractInfo = CONTRACT_ADRESSES[chainName][networkName];
                return true
            }
            return false;
        });
        return true;
    });
    return contractInfo;
}
export function useWrappedLunaContract(chainId?:any, withSignerIfPossible?: boolean): Contract | null {
        let lunaContracts = useFindLunaByChainId(chainId);
        return useContract(lunaContracts?.WRAPPED_LUNA, ERC20_ABI, withSignerIfPossible)
}
export function useWormHoleLunaContract(chainId?:any, withSignerIfPossible?: boolean): Contract | null {
    let lunaContracts = useFindLunaByChainId(chainId);
    return useContract(lunaContracts?.WORMHOLE_LUNA, ERC20_ABI, withSignerIfPossible)
}
