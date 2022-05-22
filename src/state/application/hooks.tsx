import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useWeb3React } from '@web3-react/core'
import { AppState } from '../index'

export function useBlockNumber(): number | undefined {
    const { chainId } = useWeb3React()
    return useAppSelector(
        (state: AppState) => state.application.blockNumber[chainId ?? -1]
    )
}
