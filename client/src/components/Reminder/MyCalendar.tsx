import React, { useContext, useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { RootStoreContext } from '../stores/rootStore';
import { observer } from 'mobx-react-lite';
import { IReminder } from '../models/reminder';

const localizer = momentLocalizer(moment);

const MyCalendar: React.FC = () => {
  const [events, setEvents] = useState<IReminder[]>([]);
  const rootStore = useContext(RootStoreContext);
  const { getReminders } = rootStore.reminderStore;

  useEffect(() => {
    setEvents(getReminders);
  }, [getReminders]);

  return (
    <div style={{ height: '500pt' }}>
      <Calendar
        localizer={localizer}
        events={events}
        defaultDate={moment().toDate()}
      />
    </div>
  );
};

export default observer(MyCalendar);
