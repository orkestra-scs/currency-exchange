import { createSlice, configureStore } from '@reduxjs/toolkit';


export const slice =  createSlice({
    name: 'exchange',
    initialState: {
      isLoggedIn: false,
      navSelection: 'dash',
      authSessionId: ''
    },
    reducers: {
      setLogin: (state, action) => {
        state.isLoggedIn = true;
        state.authSessionId = action.payload;
      },
      setLogout: (state) => {
        state.isLoggedIn = false;
        state.authSessionId = '';
      },
      selectMenu: (state, action) => {
        state.navSelection = action.payload;
      },
    },
})

export const store = configureStore({
    reducer: {
      exchange: slice.reducer,
    },
})
export const { setLogin, setLogout, selectMenu } = slice.actions;
export const isLoggedIn = state => state.exchange.isLoggedIn;
export const navSelection = state => state.exchange.navSelection;
export default slice.reducer;
