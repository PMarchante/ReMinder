export interface IReminder {
  id: string;
  title: string;
  date: Date;
  start?: Date;
  end?: Date;
  description: string;
  location: string;
}

export class ReminderFormValues implements IReminderFormValues {
  id?: string = undefined;
  title: string = '';
  description: string = '';
  location: string = '';
  date?: Date = undefined;
  time?: Date = undefined;

  constructor(init?: IReminderFormValues) {
    // if (init && init.date) {
    //   init.time = init.date;
    // }
    //this will map the properties in the empty class to the properties of the object we choose to edit
    Object.assign(this, init);
  }
}

export interface IReminderFormValues extends Partial<IReminder> {
  time?: Date;
}
