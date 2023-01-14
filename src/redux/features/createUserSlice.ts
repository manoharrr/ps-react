import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { createUser, User } from "../../graphql/createUser";

interface InitialState {
    loading: boolean,
    error: string,
    modal: boolean,
    success: string
}
interface Response {
    createUser: string
}
export const initialState: InitialState = {
    loading: false,
    modal: false,
    error: '',
    success: ''
}
export const createUserAccount = createAsyncThunk('createUser/createUserAccount', async (Obj: User) => {
    return await createUser(Obj)
})
const createUserSlice = createSlice({
    name: "createUser",
    initialState,
    reducers: {
        closeSuccessModal: (state) => {
            state.modal = false;
            state.error = ''
            state.success = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUserAccount.pending, (state) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(createUserAccount.fulfilled, (state, action: PayloadAction<Response>) => {
            state.loading = false
            state.error = ''
            state.modal = true
            if (action.payload.createUser === "Success") {
                state.success = "Success"
            }
        })
        builder.addCase(createUserAccount.rejected, (state, action) => {
            state.loading = false
            state.success = ''
            state.modal = false
            state.error = action.error.message?.substring(0, 21) || 'Something went wrong.Please try again later.'
        })
        builder.addCase(PURGE, () => initialState);
    }
})

export default createUserSlice.reducer;
export const { closeSuccessModal } = createUserSlice.actions;