// Deps
import React, { ReactFragment } from 'react';
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
  reminders: { [id: string]: Reminder }
}

const Cell: React.FC<Props> = (props) => {
  const { date, className, onClickEvent, reminders } = props;
  const handleClickEvent = (reminder: Reminder) => () => onClickEvent(reminder);
  const getSampleEvent = () => ({ ...SAMPLE_EVENT, dateTime: date.toDate(), color: randomHexColor() });

  const buildReminderList = (): ReactFragment => {
    return Object.values(reminders)
      .filter((reminder: Reminder) =>
        moment(reminder.dateTime).format('MMM/D/YYYY') === date.format('MMM/D/YYYY'))
      .sort((a, b) => {
        const timestampA = a.dateTime.getTime();
        const timestampB = b.dateTime.getTime();
        if (timestampA > timestampB) return 1;
        if (timestampA < timestampB) return -1;
        return 0;
      })
      .map((reminder: Reminder) => (
        <button
          key={reminder.id}
          onClick={handleClickEvent(reminder)}
          className={style.reminder}
          style={{
            backgroundColor: reminder.color,
          }}
        >
          {moment(reminder.dateTime).format('HH:mm')} {reminder.title}
        </button>
      ))
  }

  return (
    <div className={classNames(style.cell, className)}>
      <div className={style.dayLabel} onClick={handleClickEvent(getSampleEvent())}>{date.format('D')}</div>
      <div className={style.remindersContainer}>
        {buildReminderList()}
      </div>
    </div>
  );
}

export default Cell;
