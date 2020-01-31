import { Moment } from 'moment';
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
  BUILD_CALENDAR_PAGE_SUCCESS,
  BUILD_CALENDAR_PAGE_START,
  BUILD_CALENDAR_PAGE_FAIL,
} from '../../constants';
import Reminder from '../../types/Reminder';

export interface buildCalendarPageStart {
  type: typeof BUILD_CALENDAR_PAGE_START;
  payload: Moment;
}

export interface buildCalendarPageSuccess {
  type: typeof BUILD_CALENDAR_PAGE_SUCCESS;
  payload: Reminder;
}

export interface buildCalendarPageFail {
  type: typeof BUILD_CALENDAR_PAGE_FAIL;
  payload: any;
}

// Create
export interface createReminderStart {
  type: typeof CREATE_REMINDER_REQUEST;
}

export interface createReminderSuccess {
  type: typeof CREATE_REMINDER_SUCCESS;
  payload: Reminder;
}

export interface createReminderFail {
  type: typeof CREATE_REMINDER_FAIL;
  payload: any;
}

// Update
export interface updateReminderStart {
  type: typeof UPDATE_REMINDER_REQUEST;
}

export interface updateReminderSuccess {
  type: typeof UPDATE_REMINDER_SUCCESS;
  payload: Reminder;
}

export interface updateReminderFail {
  type: typeof UPDATE_REMINDER_FAIL;
  payload: any;
}

// Delete
export interface deleteReminderStart {
  type: typeof DELETE_REMINDER_REQUEST;
}

export interface deleteReminderSuccess {
  type: typeof DELETE_REMINDER_SUCCESS;
  payload: Reminder;
}

export interface deleteReminderFail {
  type: typeof DELETE_REMINDER_FAIL;
  payload: any;
}

export type CalendarActionTypes =
  | createReminderStart
  | createReminderSuccess
  | createReminderFail
  | updateReminderStart
  | updateReminderSuccess
  | updateReminderFail
  | deleteReminderStart
  | deleteReminderSuccess
  | deleteReminderFail;
