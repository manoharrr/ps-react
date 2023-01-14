import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { showTransactions } from '../../graphql/queries';
import { PURGE } from 'redux-persist'

export interface CommonFields {
    _id: string,
    accountType: string,
    amount: number,
    createdAt: string,
    transactionType: string
}

interface Transaction {
    showTransactions: [CommonFields?]
}
interface InitialState extends Transaction {
    loading: boolean,
    error: string,
}
export const initialState: InitialState = {
    loading: false,
    error: '',
    showTransactions: [],
}

export const fetchSBTransactions = createAsyncThunk('transaction/fetchSBTransactions', async () => {
    return await showTransactions()
})


const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(fetchSBTransactions.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSBTransactions.fulfilled, (state, action: PayloadAction<Transaction>) => {
            state.loading = false
            state.showTransactions = action.payload.showTransactions
            state.error = ''
        })
        builder.addCase(fetchSBTransactions.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
        })
        builder.addCase(PURGE, () => initialState);
    }
});

export default transactionSlice.reducer;