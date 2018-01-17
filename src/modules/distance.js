import { createAction, handleActions } from 'redux-actions';

const INCREASE_DISTANCE = 'INCREASE_DISTANCE';
const SET_DISTANCE = 'SET_DISTANCE';
const SET_USER_DISTANCE = 'SET_USER_DISTANCE';

export const increaseDistance = createAction(INCREASE_DISTANCE);
export const setDistance = createAction(SET_DISTANCE);
export const setUserDistance = createAction(SET_USER_DISTANCE);

const initialState = {
  distance: 0,
  userDistance: 0
};

const calc = distance => Math.floor(distance * 10) / 10;

export default handleActions(
  {
    [INCREASE_DISTANCE]: (state, action) => ({
      ...state,
      distance: calc(state.distance + action.payload.distance),
      userDistance: calc(state.userDistance + action.payload.userDistance)
    }),
    [SET_DISTANCE]: (state, action) => ({
      ...state,
      distance: action.payload.distance
    }),
    [SET_USER_DISTANCE]: (state, action) => ({
      ...state,
      userDistance: action.payload.distance
    })
  },
  initialState
);
