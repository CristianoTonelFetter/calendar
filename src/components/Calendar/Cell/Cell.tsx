import React from 'react';

import classNames from 'classnames';

import style from './Cell.module.scss';

type Props = {
  date: Date,
  monthOfDisplay: number,
}

const CalendarCell: React.FC<Props> = (props) => {
  const { date, monthOfDisplay } = props;

  return (
    <div className={classNames(style.cell, date.getMonth() !== monthOfDisplay && style.disabled)}>
      {date.getDate()}
    </div>
  );
}

export default CalendarCell;
