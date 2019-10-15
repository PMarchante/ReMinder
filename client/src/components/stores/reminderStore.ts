import { observable, action, computed, runInAction } from 'mobx';
import { IReminder } from '../models/reminder';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { setReminderProps } from '../util/helpers';

export default class ReminderStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable reminderRegistry = new Map();
  @observable reminders: IReminder[] = [];
  @observable loadingInitial = false;
  @observable reminder: IReminder | null = null;
  @observable submitting = false;
  @observable target = '';
  @observable loading = false;
  @observable change = true;
  @observable selectedReminder: IReminder | undefined;
  @computed get remindersByDate() {
    //activityRegistry is NOT an array so passing it like this lets us treat it as one
    return this.groupRemindersByDate(
      Array.from(this.reminderRegistry.values())
    );
  }

  groupRemindersByDate(reminders: IReminder[]) {
    const sortedReminders = reminders.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return Object.entries(
      sortedReminders.reduce(
        (reminders, reminder) => {
          const date = reminder.date.toISOString().split('T')[0];
          reminders[date] = reminders[date]
            ? [...reminders[date], reminder]
            : [reminder];

          return reminders;
        },
        {} as { [key: string]: IReminder[] }
      )
    );
  }

  @action getReminders = () => {
    runInAction(() => {
      this.reminderRegistry.forEach((reminder) => {
        this.reminders.push(reminder);
      });
    });
    return this.reminders;
  };

  @action loadReminders = async () => {
    try {
      this.loading = true;
      const reminders = await agent.Reminders.list();
      runInAction('loading reminders', () => {
        reminders.forEach((reminder) => {
          setReminderProps(reminder, this.rootStore.userStore.user!);
          reminder.start = reminder.date;
          reminder.end = reminder.date;
          this.reminderRegistry.set(reminder.id, reminder);
        });
        this.reminder = reminders[0];
      });
      this.loading = false;
    } catch (error) {
      runInAction('loading reminders error', () => {
        console.log(error);
        this.loading = false;
      });
    }
  };

  @action createReminder = async (reminder: IReminder) => {
    try {
      await agent.Reminders.create(reminder);
      runInAction('creating activity', () => {
        this.reminderRegistry.set(reminder.id, reminder);
      });
    } catch (error) {
      runInAction('error creating reminder', () => {
        console.log(error.response);
      });
    }
  };

  @action editReminder = async (reminder: IReminder) => {
    try {
      await agent.Reminders.update(reminder);
      runInAction('editing reminder', () => {
        this.reminderRegistry.set(reminder.id, reminder);
        this.reminder = reminder;
      });
    } catch (error) {
      runInAction('error editing activity', () => {
        console.log(error.response);
      });
    }
  };

  @action deleteReminder = async (reminder: IReminder) => {
    try {
      await agent.Reminders.delete(reminder.id);
      runInAction('deleting activity', () => {
        this.reminderRegistry.delete(reminder.id);
      });
    } catch (error) {
      console.log(error);
      runInAction('error deleting activity', () => {});
    }
  };
}
