import React from 'react';
import moment, { Moment } from 'moment';
import classNames from 'classnames';

import style from './Cell.module.scss';

type Props = {
  date: Moment,
  className: string,
}

const CalendarCell: React.FC<Props> = (props) => {
  const { date, className } = props;

  return (
    <div className={classNames(style.cell, className)}>
      {date.format('D')}
    </div>
  );
}

export default CalendarCell;
