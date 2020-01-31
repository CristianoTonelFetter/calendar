import { Dispatch } from 'redux';
import moment, { Moment } from 'moment';
import {
  CREATE_REMINDER_REQUEST,
  CREATE_REMINDER_SUCCESS,
  CREATE_REMINDER_FAIL,
  UPDATE_REMINDER_REQUEST,
  UPDATE_REMINDER_SUCCESS,
  UPDATE_REMINDER_FAIL,
  DELETE_REMINDER_REQUEST,
  DELETE_REMINDER_SUCCESS,
  DELETE_REMINDER_FAIL,
  CALENDAR_GRID_COLUMNS,
  CALENDAR_GRID_ROWS,
  BUILD_CALENDAR_PAGE_START,
  BUILD_CALENDAR_PAGE_SUCCESS,
  BUILD_CALENDAR_PAGE_FAIL,
} from '../../constants';
import { CalendarActionTypes } from './types';
import { AppState } from '../../reducers/rootReducer';
import Reminder from '../../types/Reminder';
import { CalendarPage } from '../../types/CalendarPage';

export const buildCalendarPageStart = (currentView: Moment): CalendarActionTypes => {
  return {
    type: BUILD_CALENDAR_PAGE_START,
    payload: currentView,
  };
};

export const buildCalendarPageSuccess = (payload: CalendarPage): CalendarActionTypes => {
  return {
    type: BUILD_CALENDAR_PAGE_SUCCESS,
    payload,
  };
};

export const buildCalendarPageFail = (payload: any): CalendarActionTypes => {
  return {
    type: BUILD_CALENDAR_PAGE_FAIL,
    payload,
  };
};

/******* create ********/

export const createReminderStart = (): CalendarActionTypes => {
  return {
    type: CREATE_REMINDER_REQUEST,
  };
};

export const createReminderSuccess = (payload: Reminder): CalendarActionTypes => {
  return {
    type: CREATE_REMINDER_SUCCESS,
    payload,
  };
};

export const createReminderFail = (payload: any): CalendarActionTypes => {
  return {
    type: CREATE_REMINDER_FAIL,
    payload,
  };
};

/******* update ********/

export const updateReminderStart = (): CalendarActionTypes => {
  return {
    type: UPDATE_REMINDER_REQUEST,
  };
};

export const updateReminderSuccess = (payload: Reminder): CalendarActionTypes => {
  return {
    type: UPDATE_REMINDER_SUCCESS,
    payload,
  };
};

export const updateReminderFail = (payload: any): CalendarActionTypes => {
  return {
    type: UPDATE_REMINDER_FAIL,
    payload,
  };
};

/******* delete ********/

export const deleteReminderStart = (): CalendarActionTypes => {
  return {
    type: DELETE_REMINDER_REQUEST,
  };
};

export const deleteReminderSuccess = (payload: Reminder): CalendarActionTypes => {
  return {
    type: DELETE_REMINDER_SUCCESS,
    payload,
  };
};

export const deleteReminderFail = (payload: any): CalendarActionTypes => {
  return {
    type: DELETE_REMINDER_FAIL,
    payload,
  };
};

/******* action creators ********/

// create
export const createReminder = (item: Reminder) => async (
  dispatch: Dispatch<CalendarActionTypes>,
  getState: () => AppState
): Promise<any> => {
  dispatch(createReminderStart());

  try {
    dispatch(createReminderSuccess(item));
  } catch (error) {
    dispatch(createReminderFail(error));
  }
};

// update
export const updateReminder = (item: Reminder) => async (
  dispatch: Dispatch<CalendarActionTypes>,
  getState: () => AppState
) => {
  dispatch(updateReminderStart());
  try {
    dispatch(updateReminderSuccess(item));
  } catch (error) {
    dispatch(updateReminderFail(error));
  }
};

const getDaysInMonth = (currentDate: Moment): Moment[] => {
  const newDate = moment(currentDate);
  const days = [moment(newDate)];

  while (newDate.format('YYYY/MM') === currentDate.format('YYYY/MM')) {
    const pushDate = moment(newDate.add(1, 'days'));
    days.push(pushDate);
  }

  return days;
};

export const buildCalendarPage = (date: Moment) => async (
  dispatch: Dispatch<CalendarActionTypes>,
  getState: () => AppState
) => {
  dispatch(buildCalendarPageStart(date));
  try {
    const currentDate = moment(date);
    const monthDays = getDaysInMonth(currentDate);

    // First week day of selected month
    const startingWeekday = moment(currentDate).day();

    // If the month doesn't starts on monday, fill the gap before
    if (startingWeekday > 0) {
      for (let i = 1; i <= startingWeekday; i++) {
        // Subtract one day
        const prevDay = moment(currentDate).subtract(i, 'days');

        // Append item to the beginning of the array
        monthDays.unshift(prevDay);
      }
    }

    const extraCells = CALENDAR_GRID_COLUMNS * CALENDAR_GRID_ROWS - monthDays.length;
    // const extraCells = monthDays.length % GRID_COLUMNS;

    // Fill slots at the end of days list if needed
    if (extraCells > 0) {
      // for (let i = 1; i <= GRID_COLUMNS - extraCells; i++) {
      for (let i = 1; i <= extraCells; i++) {
        // Add one day
        const extraDay = moment(monthDays[monthDays.length - i]).add(i, 'days');

        // Append item to the end of the array
        monthDays.push(extraDay);
      }
    }

    dispatch(buildCalendarPageSuccess(monthDays));
  } catch (error) {
    dispatch(buildCalendarPageFail(error));
  }
};
