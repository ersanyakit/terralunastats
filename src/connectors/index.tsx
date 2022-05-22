import { InjectedConnector } from "@web3-react/injected-connector"

import {BigNumber} from "@ethersproject/bignumber";


export const BLOCKCHAINS = {
    ETH:
        {//ETHEREUM MAIN NETWORK
            MAIN: {
                chainId: '0x1',
                chainName: 'ETHEREUM MAIN NETWORK',
                nativeCurrency: {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18,
                },
                rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                blockExplorerUrls: ['https://etherscan.io']
            },
            KOVAN: {
                chainId: '0x2A',
                chainName: 'ETHEREUM KOVAN TEST NETWORK',
                nativeCurrency: {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18,
                },
                rpcUrls: ['https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                blockExplorerUrls: ['https://kovan.etherscan.io']
            },
            ROPSTEN: {
                chainId: '0x3',
                chainName: 'ETHEREUM ROPSTEN TEST NETWORK',
                nativeCurrency: {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18,
                },
                rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                blockExplorerUrls: ['https://ropsten.etherscan.io']
            },
            RINKEBY: {
                chainId: '0x4',
                chainName: 'ETHEREUM RINKEBY TEST NETWORK',
                nativeCurrency: {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18,
                },
                rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                blockExplorerUrls: ['https://rinkeby.etherscan.io']
            }
        },
    BSC:
        {//BINANCE SMART CHAIN MAIN NETWORK
            MAIN: {
                chainId: '0x38',
                chainName: 'BINANCE SMART CHAIN',
                nativeCurrency: {
                    name: 'BNB',
                    symbol: 'BNB',
                    decimals: 18,
                },
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com']
            },
            TEST: {
                chainId: '0x61',
                chainName: 'BINANCE SMART CHAIN TESTNET',
                nativeCurrency: {
                    name: 'BNB',
                    symbol: 'BNB',
                    decimals: 18,
                },
                rpcUrls: ['https://data-seed-prebsc-2-s3.binance.org:8545'],
                blockExplorerUrls: ['https://testnet.bscscan.com']
            }
        },
    AVAX: {//AVAX NETWORK
        MAIN: {
            chainId: '0xA86A',
            chainName: 'Avalanche Mainnet',
            nativeCurrency: {
                name: 'AVAX',
                symbol: 'AVAX',
                decimals: 18,
            },
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://cchain.explorer.avax.network/']
        },
        FUJI:{
            chainId: '0xa869',
            chainName: 'Avalanche FUJI Test Network',
            nativeCurrency: {
                name: 'Avalanche',
                symbol: 'AVAX',
                decimals: 18,
            },
            rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://cchain.explorer.avax-test.network/']
        }
    },
    MATIC:{
        MAIN: {
            chainId: '0x89',
            chainName: 'Polygon/Matic Mainnet',
            nativeCurrency: {
                name: 'MATIC',
                decimals: 18,
                symbol: 'MATIC'
            },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: ['https://polygonscan.com'],
        }
    },
    FTM:{
        MAIN: {
            chainId: '0xFA',
            chainName: 'Fantom',
            nativeCurrency: {
                name: 'FTM',
                decimals: 18,
                symbol: 'FTM'
            },
            rpcUrls: ['https://rpc.ftm.tools'],
            blockExplorerUrls: ['https://ftmscan.com'],
        }
    },
    ARB:{//ARBITRUM CHAIN
    MAIN: {
        chainId: '0xA4B1',
            chainName: 'Arbitrum Mainnet',
            nativeCurrency: {
            name: 'ETH',
                decimals: 18,
                symbol: 'ETH'
        },
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://arbiscan.io'],
    }
},
    XDAI:
        {//XDAI CHAIN
            MAIN: {
                chainId: '0x64',
                chainName: 'xDAI Chain',
                nativeCurrency: {
                    name: 'xDAI',
                    decimals: 18,
                    symbol: 'xDAI'
                },
                rpcUrls: ['https://dai.poa.network'],
                blockExplorerUrls: ['https://blockscout.com/poa/xdai'],
            }
        },
    OE:
        {//OPTIMISM
            MAIN: {
                chainId: '0xA',
                chainName: 'OΞ',
                nativeCurrency: {
                    name: 'ETH',
                    decimals: 18,
                    symbol: 'ETH'
                },
                rpcUrls: ['https://mainnet.optimism.io'],
                blockExplorerUrls: ['https://optimistic.etherscan.io'],
            }
        },
    ETC:
        {//ETH CLASSIC
            MAIN: {
                chainId: '0x3D',
                chainName: 'ETHEREUM CLASSIC',
                nativeCurrency: {
                    name: 'ETC',
                    decimals: 18,
                    symbol: 'ETC'
                },
                rpcUrls: ['https://www.ethercluster.com/etc'],
                blockExplorerUrls: ['https://blockscout.com/etc/mainnet/'],
            }
        }



}



const POLLING_INTERVAL = 12000;


export function SUPPORTED_RPC_ID_LIST(): { [id: string]: any; }{
    let chainList :  { [id: string]: any; } = {};
    for (const [CHAIN, NETWORKS] of Object.entries(BLOCKCHAINS)) {
        for (const [NETWORK,NETWORK_DATA] of Object.entries(NETWORKS)) {
            chainList[BigNumber.from(NETWORK_DATA.chainId).toNumber()] = NETWORK_DATA.rpcUrls[0]; // add item to dictionary
        }
    }
    return chainList;
}


function SUPPORTED_CHAIN_ID_LIST(): number[] {
    let chainList = [];
    for (const [CHAIN, NETWORKS] of Object.entries(BLOCKCHAINS)) {
        for (const [NETWORK,NETWORK_DATA] of Object.entries(NETWORKS)) {
            chainList.push(BigNumber.from(NETWORK_DATA.chainId).toNumber());
        }
    }
    return chainList;
}

export const injected = new InjectedConnector({
    supportedChainIds: SUPPORTED_CHAIN_ID_LIST(),
})


export function supportedChainId(chainId: number): number | undefined {
    if (chainId in SUPPORTED_CHAIN_ID_LIST()) {
        return chainId
    }
    return undefined
}

