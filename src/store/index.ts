import { combineReducers, legacy_createStore } from 'redux';
import { getRandomAvatarOption } from '@utils';
import { WrapperShape } from '@enums';
import { SCREEN } from '@constants';
import { ActionTypes } from '@types';
import { REDO, SET_AVATAR_OPTION, SET_SIDER_STATUS, UNDO } from './mutation-type';


// Initial State
const initialState = {
  history: {
    past: [],
    present: getRandomAvatarOption({ wrapperShape: WrapperShape.Squircle }),
    future: [],
  },
  isCollapsed: window.innerWidth <= SCREEN.lg,
};

// Reducer
const historyReducer = (state = initialState.history, action: ActionTypes) => {
  switch (action.type) {
    case SET_AVATAR_OPTION:
      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: [],
      };
    case UNDO:
      if (state.past.length > 0) {
        const previous = state.past[state.past.length - 1];
        const newPast = state.past.slice(0, state.past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [state.present, ...state.future],
        };
      }
      return state;
    case REDO:
      if (state.future.length > 0) {
        const next = state.future[0];
        const newFuture = state.future.slice(1);
        return {
          past: [...state.past, state.present],
          present: next,
          future: newFuture,
        };
      }
      return state;
    default:
      return state;
  }
};

const isSiderBarCollapsedReducer = (state = initialState.isCollapsed, action: ActionTypes) => {
  switch (action.type) {
    case SET_SIDER_STATUS:
      return action.payload;
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  history: historyReducer,
  isCollapsed: isSiderBarCollapsedReducer,
});
const store = legacy_createStore(rootReducer);
// Store
export default store;

