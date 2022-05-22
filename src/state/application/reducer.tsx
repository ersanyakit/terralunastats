import { createReducer, nanoid } from '@reduxjs/toolkit'
import {
    updateBlockNumber,
    updateChainId,
} from './actions'

export interface ApplicationState {
    readonly chainId: number | null
    readonly blockNumber: { readonly [chainId: number]: number }
}

const initialState: ApplicationState = {
    chainId: null,
    blockNumber: {},
}

export default createReducer(initialState, builder =>
    builder
        .addCase(updateChainId, (state, action) => {
            const { chainId } = action.payload
            state.chainId = chainId
        })
        .addCase(updateBlockNumber, (state, action) => {
            const { chainId, blockNumber } = action.payload
            if (typeof state.blockNumber[chainId] !== 'number') {
                state.blockNumber[chainId] = blockNumber
            } else {
                state.blockNumber[chainId] = Math.max(
                    blockNumber,
                    state.blockNumber[chainId]
                )
            }
        })
)
