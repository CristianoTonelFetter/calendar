import randomHexColor from './utils/randomHexColor';

/******* Calendar actions *******/

export const CREATE_REMINDER_REQUEST: string = 'CREATE_REMINDER_REQUEST';
export const CREATE_REMINDER_SUCCESS: string = 'CREATE_REMINDER_SUCCESS';
export const CREATE_REMINDER_FAIL: string = 'CREATE_REMINDER_FAIL';

export const UPDATE_REMINDER_REQUEST: string = 'UPDATE_REMINDER_REQUEST';
export const UPDATE_REMINDER_SUCCESS: string = 'UPDATE_REMINDER_SUCCESS';
export const UPDATE_REMINDER_FAIL: string = 'UPDATE_REMINDER_FAIL';

export const DELETE_REMINDER_REQUEST: string = 'DELETE_REMINDER_REQUEST';
export const DELETE_REMINDER_SUCCESS: string = 'DELETE_REMINDER_SUCCESS';
export const DELETE_REMINDER_FAIL: string = 'DELETE_REMINDER_FAIL';

export const BUILD_CALENDAR_PAGE_START: string = 'BUILD_CALENDAR_PAGE_START';
export const BUILD_CALENDAR_PAGE_SUCCESS: string = 'BUILD_CALENDAR_PAGE_SUCCESS';
export const BUILD_CALENDAR_PAGE_FAIL: string = 'BUILD_CALENDAR_PAGE_FAIL';

/******* Defaults *******/

export const SAMPLE_EVENT = {
  title: 'New reminder',
  dateTime: new Date(),
  city: 'New York',
  color: randomHexColor(),
};

export const CALENDAR_GRID_COLUMNS: number = 7;
export const CALENDAR_GRID_ROWS: number = 6;
