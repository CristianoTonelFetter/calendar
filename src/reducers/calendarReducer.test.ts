import reducer from './calendarReducer';
import * as actions from '../actions/calendar';

import { initialState } from './calendarReducer';
import Reminder, { ReminderList } from '../types/Reminder';

const mockReminderId1: string = 'a1d0e884-234d-42b4-9fd0-4a25d52cee10';
const mockReminderId2: string = 'a3769d2c-8f96-4927-9893-642567b2049f';

const mockReminder1: Reminder = {
  id: mockReminderId1,
  title: 'Exercise',
  dateTime: new Date(),
  city: 'Caxias do Sul',
  color: '#444444',
};

const mockReminder2: Reminder = {
  id: mockReminderId2,
  title: 'Feed the fish',
  dateTime: new Date(),
  city: 'New York',
  color: '#eeeeee',
};

const mockReminderList1: ReminderList = {
  [mockReminderId1]: mockReminder1,
};

const mockReminderList2: ReminderList = {
  [mockReminderId1]: mockReminder1,
  [mockReminderId2]: mockReminder2,
};

describe('Calendar reducer', () => {
  test('should include the new Reminder in the empty list', () => {
    const reducedState = reducer(initialState, actions.createReminderSuccess(mockReminder1));

    expect(Object.keys(reducedState.reminders).length).toEqual(1);
    expect(Object.values(reducedState.reminders)[0].id).toEqual(mockReminderId1);
    expect(reducedState.reminders).toEqual(mockReminderList1);
  });

  test('should include another Reminder in the filled list', () => {
    const newState = { ...initialState, reminders: mockReminderList1 };
    const reducedState = reducer(newState, actions.createReminderSuccess(mockReminder2));

    expect(Object.keys(reducedState.reminders).length).toEqual(2);
    expect(Object.values(reducedState.reminders)[1].id).toEqual(mockReminderId2);
    expect(reducedState.reminders).toEqual(mockReminderList2);
  });

  test('should include a reminder and then update it', () => {
    // Add a new Reminder
    const reducedState = reducer(initialState, actions.createReminderSuccess(mockReminder1));

    expect(Object.keys(reducedState.reminders).length).toEqual(1);
    expect(Object.values(reducedState.reminders)[0].id).toEqual(mockReminderId1);
    expect(reducedState.reminders).toEqual(mockReminderList1);

    const newTitle = 'The new title';
    const updatedReminder = { ...mockReminder1, title: newTitle };

    // Update a Reminder
    const updatedReducedState = reducer(
      reducedState,
      actions.updateReminderSuccess(updatedReminder)
    );

    expect(Object.keys(updatedReducedState.reminders).length).toEqual(1);
    expect(Object.values(updatedReducedState.reminders)[0].id).toEqual(updatedReminder.id);
    expect(Object.values(updatedReducedState.reminders)[0].title).toEqual(newTitle);
    expect(Object.values(updatedReducedState.reminders)[0]).toEqual(updatedReminder);
  });

  test('should update a reminder in a filled list', () => {
    const existingState = { ...initialState, reminders: mockReminderList2 };

    const newTitle = 'The new title';
    const updatedReminder = { ...mockReminder2, title: newTitle };

    // Update a Reminder
    const updatedReducedState = reducer(
      existingState,
      actions.updateReminderSuccess(updatedReminder)
    );

    expect(Object.keys(updatedReducedState.reminders).length).toEqual(2);
    expect(Object.values(updatedReducedState.reminders)[1].id).toEqual(updatedReminder.id);
    expect(Object.values(updatedReducedState.reminders)[1].title).toEqual(newTitle);
    expect(Object.values(updatedReducedState.reminders)[1]).toEqual(updatedReminder);
  });

  test('should delete a reminder from the list', () => {
    const existingState = { ...initialState, reminders: { ...mockReminderList2 } };
    const reminderToDelete = { ...existingState.reminders[mockReminderId2] };

    // Delete a Reminder
    const state = reducer(existingState, actions.deleteReminderSuccess(reminderToDelete));

    expect(Object.keys(state.reminders).length).toEqual(1);
    expect(Object.values(state.reminders)[0].id).not.toEqual(reminderToDelete.id);
    expect(Object.values(state.reminders)[0]).not.toEqual(reminderToDelete);
  });
});
