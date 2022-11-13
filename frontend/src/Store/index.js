import { createSlice , configureStore} from '@reduxjs/toolkit';
const authSlice = createSlice({
    name: "auth",
    initialState:{isLoggedIn: false, themeSide: '', userInfo:{userId:'', userName:''}},
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
        setThemeSideLight(state){
            state.themeSide = 'light'
        },
        setThemeSideDark(state){
            state.themeSide = 'dark'
        }
    }
});
export const authActions = authSlice.actions;
export const store = configureStore({
    reducer: authSlice.reducer
});