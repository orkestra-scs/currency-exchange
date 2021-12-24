import { createSlice, configureStore } from '@reduxjs/toolkit';


export const slice =  createSlice({
    name: 'authSlice',
    initialState: {
      isLoggedIn: false,
      navSelection: 'dash',
    },
    reducers: {
      setLogin: (state) => {
        state.isLoggedIn = true;
      },
      setLogout: (state) => {
        state.isLoggedIn = false
      },
      selectMenu: (state, action) => {
        state.navSelection = action.payload
      },
    },
})

export const store = configureStore({
    reducer: {
      auth: slice.reducer,
    },
})
export const { setLogin, setLogout, selectMenu } = slice.actions;
export const isLoggedIn = state => state.auth.isLoggedIn;
export const navSelection = state => state.auth.navSelection;
export default slice.reducer;