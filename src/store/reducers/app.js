import { createSlice } from '@reduxjs/toolkit'
import { BrazilTheme, MyDarkTheme, MyLightTheme } from "../../components/MyTheme"

const ThemeList = {
    'DARK': MyDarkTheme,
    'LIGHT': MyLightTheme,
    'BRAZIL': BrazilTheme,
}
const initialState = {
  captured: [],
  pokeballs: 0,
  theme: ThemeList['DARK'],
}

export const appSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    capture: (state, action) => {
      state.captured.push(action.payload);
    },
    resetCaptured: (state, action) => {
      state.captured = []
    },
    resetPokeballs: (state, action) => {
      state.pokeballs = 100
    },
    throwPokeballs: (state, action) => {
      state.pokeballs -= 1
    }
  },
})

// Action creators are generated for each case reducer function
export const { capture, resetPokeballs, throwPokeballs, resetCaptured } = appSlice.actions

export default appSlice.reducer