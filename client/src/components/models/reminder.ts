export interface IReminder {
  id: string;
  title: string;
  date: Date;
  start?: number;
  end?: number;
  description: string;
  location: string;
}

export interface IReminderFormValues extends Partial<IReminder> {
  time?: Date;
}
