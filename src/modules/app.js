import { createAction, handleActions } from 'redux-actions';

const TOGGLE_MENU = 'TOGGLE_MENU'

export const toggleMenu = createAction(TOGGLE_MENU)

const initialState = {
  menuOpen: false
}

export default handleActions({
  [TOGGLE_MENU]: (state, action) => ({
    ...state,
    menuOpen: action.payload.hasOwnProperty('menuOpen') ? action.payload.menuOpen : !state.menuOpen
  })
}, initialState)
