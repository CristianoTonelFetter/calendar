import { combineReducers } from 'redux';

import calendar from './calendarReducer';

export const rootReducer = combineReducers({
  calendar,
});

export type AppState = ReturnType<typeof rootReducer>;
