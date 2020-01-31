// Deps
import React from 'react';
import moment, { Moment } from 'moment';
import classNames from 'classnames';

// Components
import Reminder from '../../../types/Reminder';

// Styles
import style from './Cell.module.scss';

import { SAMPLE_EVENT } from '../../../constants';
import randomHexColor from '../../../utils/randomHexColor';

type Props = {
  date: Moment,
  className: string,
  onClickEvent: (reminder: Reminder) => void,
  events: { [id: string]: Reminder }
}

const Cell: React.FC<Props> = (props) => {
  const { date, className, onClickEvent, events } = props;
  const handleClickEvent = (reminder: Reminder) => () => onClickEvent(reminder);
  const getSampleEvent = () => ({ ...SAMPLE_EVENT, dateTime: date.toDate(), color: randomHexColor() });

  return (
    <div className={classNames(style.cell, className)}>
      <div className={style.dayLabel} onClick={handleClickEvent(getSampleEvent())}>{date.format('D MMM')}</div>
      <div className={style.eventsContainer}>
        {Object.values(events)
          .filter((event: Reminder) =>
            moment(event.dateTime).format('MMM/D/YYYY') === date.format('MMM/D/YYYY'))
          .map((event: Reminder) => (
            <button
              key={event.id}
              onClick={handleClickEvent(event)}
              className={style.event}
              style={{
                backgroundColor: event.color,
              }}
            >
              {event.title}
            </button>
          ))}
      </div>
    </div>
  );
}

export default Cell;
