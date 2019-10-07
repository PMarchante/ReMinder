import UserStore from './userStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import ReminderStore from './reminderStore';

configure({ enforceActions: 'always' });

export class RootStore {
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  reminderStore: ReminderStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
    this.reminderStore = new ReminderStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
