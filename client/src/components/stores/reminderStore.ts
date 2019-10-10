import { observable, action, computed, runInAction } from 'mobx';
import { IReminder } from '../models/reminder';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { setReminderProps } from '../util/helpers';
import moment from 'moment';

export default class ReminderStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable reminderRegistry = new Map(); //this is a mobx function that gives us more functionality when iterating
  @observable reminders: IReminder[] = [];
  @observable loadingInitial = false;
  @observable reminder: IReminder | null = null;
  @observable submitting = false;
  @observable target = '';
  @observable loading = false;
  @observable change = true;

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

  //this method makes an async call with axios to get the list of activities from the api
  //it then formats the dates and sets the loading indicators on and off
  @action loadReminders = async () => {
    try {
      const reminders = await agent.Reminders.list();
      runInAction('loading reminders', () => {
        reminders.forEach((reminder) => {
          setReminderProps(reminder, this.rootStore.userStore.user!);
          reminder.start = Date.now();
          reminder.end = Date.now();

          this.reminderRegistry.set(reminder.id, reminder);
        });
        this.reminder = reminders[0];
      });
    } catch (error) {
      runInAction('loading reminders error', () => {
        console.log(error);
      });
    }
  };

  @action clearReminder = () => {
    this.reminder = null;
  };

  @action selectReminder = (id: string) => {
    runInAction(() => {
      this.reminder = this.reminderRegistry.get(id);
    });
  };

  // @action createActivity = async (activity: IActivity) => {
  //   this.submitting = true;
  //   try {
  //     await agent.Activities.create(activity);
  //     const attendee = createAttendee(this.rootStore.userStore.user!);
  //     attendee.isHost = true;
  //     let attendees = [];
  //     attendees.push(attendee);
  //     activity.attendees = attendees;
  //     activity.isHost = true;
  //     runInAction('creating activity', () => {
  //       this.activityRegistry.set(activity.id, activity);

  //       this.submitting = false;
  //     });
  //     history.push(`/activities/${activity.id}`);
  //   } catch (error) {
  //     runInAction('error creating activity', () => {
  //       toast.error('error submitting activity');
  //       console.log(error.response);
  //       this.submitting = false;
  //     });
  //   }
  // };

  // @action editActivity = async (activity: IActivity) => {
  //   this.submitting = true;
  //   try {
  //     await agent.Activities.update(activity);
  //     runInAction('editing activity', () => {
  //       this.activityRegistry.set(activity.id, activity);
  //       this.activity = activity;

  //       this.submitting = false;
  //     });
  //     history.push(`/activities/${activity.id}`);
  //   } catch (error) {
  //     runInAction('error editing activity', () => {
  //       toast.error('error submitting activity');
  //       console.log(error.response);
  //       this.submitting = false;
  //     });
  //   }
  // };

  // @action deleteActivity = async (
  //   event: SyntheticEvent<HTMLButtonElement>,
  //   id: string
  // ) => {
  //   this.submitting = true;
  //   this.target = event.currentTarget.name;
  //   try {
  //     await agent.Activities.delete(id);
  //     runInAction('deleting activity', () => {
  //       this.activityRegistry.delete(id);
  //       this.submitting = false;
  //       this.target = '';
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     runInAction('error deleting activity', () => {
  //       this.submitting = false;
  //       this.target = '';
  //     });
  //   }
  // };
}
