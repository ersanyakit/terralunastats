import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { supportedChainId } from '../../connectors'
import useDebounce from '../../hooks/useDebounce'
import { useWeb3React } from '@web3-react/core'
import { useEagerConnect } from '../../hooks/web3hooks'
import { updateBlockNumber, updateChainId } from './actions'

export default function Updater(): null {
    useEagerConnect()
    const { library, chainId } = useWeb3React()
    const dispatch = useAppDispatch()

    const [state, setState] = useState<{
        chainId: number | undefined
        blockNumber: number | null
    }>({
        chainId,
        blockNumber: null,
    })

    const blockNumberCallback = useCallback(
        (blockNumber: number) => {
            console.log("blockNumberCallback güncellendi2");

            setState(state => {
                if (chainId === state.chainId) {
                    if (typeof state.blockNumber !== 'number')
                        return { chainId, blockNumber }
                    return {
                        chainId,
                        blockNumber: Math.max(blockNumber, state.blockNumber),
                    }
                }
                return state
            })
        },
        [chainId, setState]
    )

    // attach/detach listeners
    useEffect(() => {
        console.log("block güncellendi1");

        if (!library || !chainId) return undefined
        console.log("block güncellendi2");

        setState({ chainId, blockNumber: null })

        library
            .getBlockNumber()
            .then(blockNumberCallback)
            .catch(error =>
                console.error(
                    `Failed to get block number for chainId: ${chainId}`,
                    error
                )
            )
        library.on('block', blockNumberCallback)
        return () => {
            library.removeListener('block', blockNumberCallback)
        }
    }, [dispatch, chainId, library, blockNumberCallback])

    const debouncedState = useDebounce(state, 100)

    useEffect(() => {
        if (
            !debouncedState.chainId ||
            !debouncedState.blockNumber
        )
            return
        dispatch(
            updateBlockNumber({
                chainId: debouncedState.chainId,
                blockNumber: debouncedState.blockNumber,
            })
        )
    }, [
        dispatch,
        debouncedState.blockNumber,
        debouncedState.chainId,
    ])

    useEffect(() => {
        dispatch(
            updateChainId({
                chainId: debouncedState.chainId
                    ? supportedChainId(debouncedState.chainId) ?? null
                    : null,
            })
        )
    }, [dispatch, debouncedState.chainId])
    return null
}
