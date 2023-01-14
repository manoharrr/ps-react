import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addRemoveMoneyToSB, createSBAccount, getSBAccount, upgradeSBAccount } from '../../graphql/queries';
import { PURGE } from 'redux-persist'

interface CommonFields {
    accBalance: number,
    minBalance: number,
    category: string,
}

interface CreateSB extends CommonFields {
    createSBAccount: CommonFields
}

interface FetchSB extends CommonFields {
    checkSABalance: CommonFields
}

interface AddRemoveBal extends CommonFields {
    addRemoveSBAccountBalance: CommonFields
}

interface Upgrade extends CommonFields {
    upgradeDowngradeSBAccount: CommonFields
}

interface InitialState extends CommonFields {
    loading: boolean,
    error: string,
    modal: boolean,
    success: string,
}

export const initialState: InitialState = {
    category: '',
    accBalance: 0,
    minBalance: 0,
    loading: false,
    error: '',
    modal: false,
    success: ''
}

interface AddBalance {
    amount: number,
    transactionType: string
}

export const fetchSBBalance = createAsyncThunk('savingAcc/fetchSBBalance', async () => {
    return await getSBAccount()
})

export const createSBBalanceAcc = createAsyncThunk('savingAcc/createSBBalanceAcc', async () => {
    return await createSBAccount()
})

export const addRemoveMoneyToSBAcc = createAsyncThunk('savingAcc/addRemoveMoneyToSBAcc', async (obj: AddBalance) => {
    return await addRemoveMoneyToSB(obj.amount, obj.transactionType)
})

export const upgradeDowngradeSBAccount = createAsyncThunk('savingAcc/upgradeDowngradeSBAccount', async (type: string) => {
    return await upgradeSBAccount(type)
})


const savingAccSlice = createSlice({
    name: 'savingAcc',
    initialState,
    reducers: {
        closeModal: (state) => {
            state.modal = false;
            state.error = ''
        },
        resetSuccess: (state) => {
            state.success = ''
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchSBBalance.pending, (state) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(fetchSBBalance.fulfilled, (state, action: PayloadAction<FetchSB>) => {
            state.loading = false
            state.category = action.payload.checkSABalance.category;
            state.accBalance = action.payload.checkSABalance.accBalance;
            state.minBalance = action.payload.checkSABalance.minBalance;
            state.error = ''
        })
        builder.addCase(fetchSBBalance.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message?.substring(0, 10) || 'Something went wrong'
        })
        builder.addCase(createSBBalanceAcc.pending, (state) => {

            state.loading = true
            state.error = ''
        })
        builder.addCase(createSBBalanceAcc.fulfilled, (state, action: PayloadAction<CreateSB>) => {
            state.loading = false
            state.category = action.payload.createSBAccount.category;
            state.accBalance = action.payload.createSBAccount.accBalance;
            state.minBalance = action.payload.createSBAccount.minBalance;
            state.modal = true
            state.error = ''
        })
        builder.addCase(createSBBalanceAcc.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message?.substring(0, 10) || 'Something went wrong'
        })
        builder.addCase(addRemoveMoneyToSBAcc.pending, (state) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(addRemoveMoneyToSBAcc.fulfilled, (state, action: PayloadAction<AddRemoveBal>) => {
            state.loading = false
            state.category = action.payload.addRemoveSBAccountBalance.category;
            state.accBalance = action.payload.addRemoveSBAccountBalance.accBalance;
            state.minBalance = action.payload.addRemoveSBAccountBalance.minBalance;
            state.error = ''
        })
        builder.addCase(addRemoveMoneyToSBAcc.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message?.substring(0, 10) || 'Something went wrong'
        })
        builder.addCase(upgradeDowngradeSBAccount.pending, (state) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(upgradeDowngradeSBAccount.fulfilled, (state, action: PayloadAction<Upgrade>) => {
            state.loading = false
            state.category = action.payload.upgradeDowngradeSBAccount.category;
            state.accBalance = action.payload.upgradeDowngradeSBAccount.accBalance;
            state.minBalance = action.payload.upgradeDowngradeSBAccount.minBalance;
            state.success = action.payload.upgradeDowngradeSBAccount.category === "Regular" ? "Account is downgraded" : "Account is upgraded"
            state.error = ''
        })
        builder.addCase(upgradeDowngradeSBAccount.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message?.substring(0, 10) || 'Something went wrong'
        })
        builder.addCase(PURGE, () => initialState);
    }
});

export default savingAccSlice.reducer;
export const { closeModal, resetSuccess } = savingAccSlice.actions;