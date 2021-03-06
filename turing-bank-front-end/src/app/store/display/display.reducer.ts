
import { displayHidden, displayShow } from './display.actions';

export const initialState = false;

export function displayReducer(state = initialState, action) {
  switch (action.type) {
    case displayHidden:
      return true
    case displayShow:
      return false
    default:
      return state;
  }
}