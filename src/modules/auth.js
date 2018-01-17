import { createAction, handleActions } from 'redux-actions';

const TOGGLE_AUTH = 'TOGGLE_AUTH';
const SIGN_IN = 'SIGN_IN';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
const LOG_IN = 'LOG_IN';
const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const toggleAuth = createAction(TOGGLE_AUTH)
export const signIn = createAction(SIGN_IN);
export const signInSuccess = createAction(SIGN_IN_SUCCESS);
export const signInFailure = createAction(SIGN_IN_FAILURE);
export const logIn = createAction(LOG_IN);
export const logInSuccess = createAction(LOG_IN_SUCCESS);
export const logInFailure = createAction(LOG_IN_FAILURE);

const initialState = {
  logInMode: true,
  isLogIn: false,
  isLoading: false,
  name: 'ゲスト',
  message: '',
  error: false
};

export default handleActions(
  {
    [TOGGLE_AUTH]: state => ({
      ...state,
      logInMode: !state.logInMode
    }),
    [SIGN_IN]: state => ({
      ...state,
      isLoading: true
    }),
    [SIGN_IN_SUCCESS]: (state, action) => ({
      ...state,
      isLogIn: true,
      isLoading: false,
      name: action.payload.name
    }),
    [SIGN_IN_FAILURE]: (state, action) => ({
      ...state,
      isLogIn: false,
      isLoading: false,
      message: action.payload.message,
      error: action.error
    }),
    [LOG_IN]: state => ({
      ...state,
      isLoading: true
    }),
    [LOG_IN_SUCCESS]: (state, action) => ({
      ...state,
      isLogIn: true,
      isLoading: false,
      name: action.payload.name
    }),
    [LOG_IN_FAILURE]: (state, action) => ({
      ...state,
      isLogIn: false,
      isLoading: false,
      message: action.payload.message,
      error: action.error
    })
  },
  initialState
);
