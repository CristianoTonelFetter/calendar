export default interface Reminder {
  id?: string;
  title: string;
  dateTime: Date;
  city: string;
  color: string;
}

export type ReminderList = { [id: string]: Reminder };
