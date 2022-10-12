import { createSlice , configureStore} from '@reduxjs/toolkit';
const authSlice = createSlice({
    name: "auth",
    initialState:{isLoggedIn: false, showWelcome: true},
    reducers:{
        login(state){
            state.isLoggedIn = true
        },
        logout(state){
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            state.isLoggedIn = false;
            state.showWelcome = true;
        },
        setShowWelcome(state){
            state.showWelcome = false;
        }
    }
});
export const authActions = authSlice.actions;
export const store = configureStore({
    reducer: authSlice.reducer
});