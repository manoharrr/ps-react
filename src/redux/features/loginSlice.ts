import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getToken } from '../../graphql/queries';
import { PURGE } from 'redux-persist'

type User = {
    login: {
        user: {
            name: string,
            email: string;
            phone: number;
            city: string;
            occupation: string;
            income: number;
            pan: string;
        },
        auth: {
            token: string
        }
    }
}
type InitialState = {
    loading: boolean,
    name: string,
    email: string;
    phone: number | undefined;
    city: string;
    occupation: string;
    income: number | undefined;
    pan: string;
    token: string
    error: string
    isLoggedIn: boolean
}

export const initialState: InitialState = {
    loading: false,
    name: '',
    email: '',
    phone: undefined,
    city: '',
    occupation: '',
    income: undefined,
    pan: '',
    token: 'Bearer ',
    error: '',
    isLoggedIn: false
}

type Login = {
    email: string,
    password: string
}

export const fetchToken = createAsyncThunk('login/fetchToken', async (obj: Login) => {
    return await getToken(obj.email, obj.password)
})


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false
            state.name = ""
            state.token = ""
            state.email = ""
            localStorage.removeItem("name");
            localStorage.removeItem("token");
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchToken.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchToken.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false
            state.name = action.payload.login.user.name
            state.email = action.payload.login.user.email
            state.phone = action.payload.login.user.phone
            state.pan = action.payload.login.user.pan
            state.city = action.payload.login.user.city
            state.occupation = action.payload.login.user.occupation
            state.income = action.payload.login.user.income
            if (action.payload.login.auth.token.length > 1) {
                state.token += action.payload.login.auth.token
                localStorage.setItem("token", JSON.stringify(action.payload.login.auth.token));
                localStorage.setItem("name", JSON.stringify(action.payload.login.user.name));
                state.isLoggedIn = true
            }

            state.error = ''
        })
        builder.addCase(fetchToken.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong'
        })
        builder.addCase(PURGE, () => initialState);
    }
});

export default loginSlice.reducer;
export const { logout } = loginSlice.actions;