import { createSlice , configureStore} from '@reduxjs/toolkit';
const authSlice = createSlice({
    name: "auth",
    initialState:{isLoggedIn: false, themeSide: 'light', userInfo:{userId:'', userName:''}, logoSplash:false},
    reducers:{
        login(state, actions){
            state.isLoggedIn = true;
            state.userInfo.userId = actions.payload[0];
            state.userInfo.userName = actions.payload[1];
        },
        logout(state){
            localStorage.removeItem("auth_access_token");
            state.isLoggedIn = false;
            state.showWelcome = true;
            state.themeSide = '';
        },
        setThemeSide(state, actions){
            state.themeSide = actions.payload
        },
        setLogoSplash(state){
            state.logoSplash = !state.logoSplash
        }
    }
});
export const authActions = authSlice.actions;
export const store = configureStore({
    reducer: authSlice.reducer
});