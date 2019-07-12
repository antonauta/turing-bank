import { createReducer, on } from '@ngrx/store';
import { displayHidden, displayShow } from './display.actions';

export const initialState = false;

export const displayReducer = createReducer(initialState,
  on(displayHidden, state => true),
  on(displayShow, state => false)
);
