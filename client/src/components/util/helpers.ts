import { IReminder } from '../models/reminder';
import { IUser } from '../models/user';

export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ':' + time.getMinutes() + ':00';
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dateString = `${year}=${month}-${day}`;

  return new Date(dateString + ' ' + timeString);
};

export const setReminderProps = (reminder: IReminder, user: IUser) => {
  reminder.date = new Date(reminder.date);
  return reminder;
};
