import { BrazilTheme, MyDarkTheme, MyLightTheme } from "../../components/MyTheme"
import { CHANGE_THEME } from "../actions/actionTypes"

const ThemeList = {
    'DARK': MyDarkTheme,
    'LIGHT': MyLightTheme,
    'BRAZIL': BrazilTheme,
}

const initialState = {
    selectedTheme: 'DARK'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                ...state,
                selectedTheme: action.payload,
            }
        default:
            return state
    }
}

export default reducer;