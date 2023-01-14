import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist'
import { addRemoveMoneyToCC, createCCAccount, getCCAccount, upgradeCCAccount } from '../../graphql/creditQueries';

interface CommonFields {
    totalBalance: number,
    usedBalance: number,
    cardType: string,
    availableBalance: number,
    annualCharges: number
}

interface CreateCC extends CommonFields {
    createCreditAccount: CommonFields
}

interface FetchCC extends CommonFields {
    getCreditAccountDetails: CommonFields
}

interface AddRemoveBal extends CommonFields {
    addRemoveCreditAccount: CommonFields
}

interface Upgrade extends CommonFields {
    upgradeDowngradeCreditAccount: CommonFields
}

interface InitialState extends CommonFields {
    loading: boolean,
    error: string,
    modal: boolean,
    success: string
}

export const initialState: InitialState = {
    cardType: '',
    totalBalance: 0,
    usedBalance: 0,
    loading: false,
    error: '',
    modal: false,
    availableBalance: 0,
    annualCharges: 0,
    success: ''
}

interface AddBalance {
    amount: number,
    transactionType: string
}

export const fetchCCBalance = createAsyncThunk('creditCard/fetchCCBalance', async () => {
    return await getCCAccount()
})

export const createCCAcc = createAsyncThunk('creditCard/createCCAcc', async (category: string) => {
    return await createCCAccount(category)
})

export const addRemoveMoneyToCCAcc = createAsyncThunk('creditCard/addRemoveMoneyToCCAcc', async (obj: AddBalance) => {
    return await addRemoveMoneyToCC(obj.amount, obj.transactionType)
})

export const upgradeDowngradeCCAccount = createAsyncThunk('creditCard/upgradeDowngradeCCAccount', async (type: string) => {
    return await upgradeCCAccount(type)
})


const creditCardSlice
    = createSlice({
        name: 'creditCard',
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
            builder.addCase(fetchCCBalance.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            builder.addCase(fetchCCBalance.fulfilled, (state, action: PayloadAction<FetchCC>) => {
                state.loading = false
                state.annualCharges = action.payload.getCreditAccountDetails.annualCharges
                state.availableBalance = action.payload.getCreditAccountDetails.availableBalance
                state.cardType = action.payload.getCreditAccountDetails.cardType
                state.totalBalance = action.payload.getCreditAccountDetails.totalBalance
                state.usedBalance = action.payload.getCreditAccountDetails.usedBalance
                state.error = ''
            })
            builder.addCase(fetchCCBalance.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message?.substring(0, 9) || 'Something went wrong'
            })
            builder.addCase(createCCAcc.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            builder.addCase(createCCAcc.fulfilled, (state, action: PayloadAction<CreateCC>) => {
                state.loading = false
                state.annualCharges = action.payload.createCreditAccount.annualCharges
                state.availableBalance = action.payload.createCreditAccount.availableBalance
                state.cardType = action.payload.createCreditAccount.cardType
                state.totalBalance = action.payload.createCreditAccount.totalBalance
                state.usedBalance = action.payload.createCreditAccount.usedBalance
                state.modal = true
                state.error = ''
            })
            builder.addCase(createCCAcc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message?.substring(0, 10) || 'Something went wrong'
            })
            builder.addCase(addRemoveMoneyToCCAcc.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            builder.addCase(addRemoveMoneyToCCAcc.fulfilled, (state, action: PayloadAction<AddRemoveBal>) => {
                state.loading = false
                state.annualCharges = action.payload.addRemoveCreditAccount.annualCharges
                state.availableBalance = action.payload.addRemoveCreditAccount.availableBalance
                state.cardType = action.payload.addRemoveCreditAccount.cardType
                state.totalBalance = action.payload.addRemoveCreditAccount.totalBalance
                state.usedBalance = action.payload.addRemoveCreditAccount.usedBalance
                state.error = ''
            })
            builder.addCase(addRemoveMoneyToCCAcc.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message?.substring(0, 10) || 'Something went wrong'
            })
            builder.addCase(upgradeDowngradeCCAccount.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            builder.addCase(upgradeDowngradeCCAccount.fulfilled, (state, action: PayloadAction<Upgrade>) => {
                state.loading = false
                state.annualCharges = action.payload.upgradeDowngradeCreditAccount.annualCharges
                state.availableBalance = action.payload.upgradeDowngradeCreditAccount.availableBalance
                state.cardType = action.payload.upgradeDowngradeCreditAccount.cardType
                state.totalBalance = action.payload.upgradeDowngradeCreditAccount.totalBalance
                state.usedBalance = action.payload.upgradeDowngradeCreditAccount.usedBalance
                state.success = action.payload.upgradeDowngradeCreditAccount.cardType === "Gold" ? "Credit Card Downgraded" : "Credit Card Upgraded"
                state.error = ''
            })
            builder.addCase(upgradeDowngradeCCAccount.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message?.substring(0, 10) || 'Something went wrong'
            })
            builder.addCase(PURGE, () => initialState);
        }
    });

export default creditCardSlice.reducer;
export const { closeModal, resetSuccess } = creditCardSlice.actions;