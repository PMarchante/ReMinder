import React, { useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { RootStoreContext } from '../stores/rootStore';

const localizer = momentLocalizer(moment);
const now = Date.now();

const event = [
  {
    id: 1,
    title: 'Long Event',
    start: now,
    end: now
  }
];

const MyCalendar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { remindersByDate } = rootStore.reminderStore;

  // const myReminders = ()=>{
  //   remindersByDate.map(([g, reminders])=>(

  //   )

  // }

  return (
    <div style={{ height: '500pt' }}>
      <Calendar
        localizer={localizer}
        events={remindersByDate}
        defaultDate={moment().toDate()}
      />
    </div>
  );
};

export default MyCalendar;
