import React, { useState, Fragment, useContext } from 'react';
import { Card, Button, Segment, Transition } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IReminder } from '../models/reminder';
import format from 'date-fns/esm/format';
import { RootStoreContext } from '../stores/rootStore';

// interface IProps {
//   reminder: IReminder;
// }

// const ReminderDetail: React.FC<IProps> = ({ reminder }) => {
//   const [map, setMap] = useState(false);
//   const rootStore = useContext(RootStoreContext);
//   const { change } = rootStore.reminderStore;

//   return (
//     <Fragment>
//       <Card>
//         <Card.Content>
//           <Card.Header content={reminder.title} />
//           <Card.Meta content={format(reminder.date, 'MMM d YYY h:mm a')} />
//           <Card.Description content={reminder.description} />
//         </Card.Content>
//         <Card.Content extra>
//           <Button
//             compact
//             size='mini'
//             icon='angle double down'
//             floated='right'
//             onClick={() => setMap(!map)}
//           />
//         </Card.Content>
//       </Card>
//       <Transition visible={map && change} animation='fade'></Transition>
//     </Fragment>
//   );
// };

// export default observer(ReminderDetail);
