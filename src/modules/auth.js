import { createAction, handleActions } from 'redux-actions';

export const TOGGLE_AUTH = 'TOGGLE_AUTH';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOAD_LOG_IN_STATE = 'LOAD_LOG_IN_STATE';

export const toggleAuth = createAction(TOGGLE_AUTH);
export const signIn = createAction(SIGN_IN);
export const signInSuccess = createAction(SIGN_IN_SUCCESS);
export const signInFailure = createAction(SIGN_IN_FAILURE);
export const logIn = createAction(LOG_IN);
export const logInSuccess = createAction(LOG_IN_SUCCESS);
export const logInFailure = createAction(LOG_IN_FAILURE);
export const updateProfile = createAction(UPDATE_PROFILE);
export const updateProfileSuccess = createAction(UPDATE_PROFILE_SUCCESS);
export const updateProfileFailure = createAction(UPDATE_PROFILE_FAILURE);
export const logOut = createAction(LOG_OUT);
export const logOutSuccess = createAction(LOG_OUT_SUCCESS);
export const loadLogInState = createAction(LOAD_LOG_IN_STATE);

const initialState = {
  logInMode: true,
  isLogIn: false,
  isLoading: false,
  name: 'ゲスト',
  message: '',
  error: false,
  uid: ''
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
      name: action.payload.user.displayName,
      uid: action.payload.user.uid
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
      name: action.payload.user.displayName,
      uid: action.payload.user.uid
    }),
    [LOG_IN_FAILURE]: (state, action) => ({
      ...state,
      isLogIn: false,
      isLoading: false,
      message: action.payload.message,
      error: action.error
    }),
    [UPDATE_PROFILE]: state => ({
      ...state,
      isLoading: true
    }),
    [UPDATE_PROFILE_SUCCESS]: (state, action) => ({
      ...state,
      isLoading: false,
      name: action.payload.name
    }),
    [UPDATE_PROFILE_FAILURE]: (state, action) => ({
      ...state,
      isLoading: false,
      message: action.payload.message,
      error: action.error
    }),
    [LOG_OUT]: state => ({
      ...state,
      isLoading: true
    }),
    [LOG_OUT_SUCCESS]: state => ({
      ...state,
      isLoading: false,
      isLogIn: false
    }),
    [LOAD_LOG_IN_STATE]: state => ({
      ...state
    })
  },
  initialState
);
