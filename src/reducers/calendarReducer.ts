import { get } from 'lodash';
import moment, { Moment } from 'moment';
import {
  BUILD_CALENDAR_PAGE_START,
  BUILD_CALENDAR_PAGE_SUCCESS,
  CREATE_REMINDER_SUCCESS,
  UPDATE_REMINDER_SUCCESS,
} from '../constants';
import { CalendarActionTypes } from '../actions/calendar/types';
import { CalendarPage } from '../types/CalendarPage';
import Reminder from '../types/Reminder';

interface CalendarState {
  currentView: Moment;
  page: CalendarPage;
  reminders: { [id: string]: Reminder };
}

export const initialState: CalendarState = { page: [], reminders: {}, currentView: moment() };

export default (
  state: CalendarState = initialState,
  action: CalendarActionTypes
): CalendarState => {
  switch (action.type) {
    case BUILD_CALENDAR_PAGE_START:
      return {
        ...state,
        currentView: get(action, 'payload', state.currentView),
      };
    case BUILD_CALENDAR_PAGE_SUCCESS:
      return {
        ...state,
        page: [...get(action, 'payload', state.page)],
      };
    case CREATE_REMINDER_SUCCESS:
    case UPDATE_REMINDER_SUCCESS: {
      const id = get(action, 'payload.id');
      const newList = {
        ...state.reminders,
        [id]: get(action, 'payload'),
      };

      const newState = {
        ...state,
        reminders: newList,
      };

      return newState;
    }
    default:
      return state;
  }
};
