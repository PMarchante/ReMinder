export interface IReminder {
  id: string;
  title: string;
  date: Date;
  description: string;
  location: string;
}

export interface IReminderFormValues extends Partial<IReminder> {
  time?: Date;
}
