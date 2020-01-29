import React, { useState } from 'react';
import moment, { Moment } from 'moment';

import Cell from './Cell';

import style from './Calendar.module.scss';

const Calendar: React.FC = () => {
  // FORECAST API KEY 3c48573221636e07f91eb463895bb1bb

  const weekDays: String[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thurday',
    'Friday',
    'Saturday',
  ];
  const GRID_SIZE: number = 5 * 7;
  const [selectedDate, setSelectedDate] = useState<Moment>(moment().startOf('month'));

  const renderWeekdays = (): React.ReactFragment => {
    return (
      <>
        {weekDays.map(day => (
          <div className={style.header} key={`weekDay_${day}`}>
            {day}
          </div>
        ))}
      </>
    );
  };

  const getDaysInMonth = (date: Moment): Moment[] => {
    const newDay = moment(selectedDate);
    const days = [moment(newDay)];

    while (newDay.format('YYYY/MM') === date.format('YYYY/MM')) {
      const pushDate = moment(newDay.add(1, 'days'));
      days.push(pushDate);
    }

    return days;
  };

  const belongsToSelectedMonth = (date: Moment) => {
    return date.format('MM') !== selectedDate.format('MM');
  }

  const buildGrid = (): React.ReactFragment => {
    const currentDate = moment(selectedDate);
    const monthDays = getDaysInMonth(currentDate);

    // First week day of selected month
    const startingWeekday = moment(currentDate).day();

    // If the month doesn't starts on monday, fill the gap before
    if (startingWeekday > 0) {
      for (let i = 1; i <= startingWeekday; i++) {
        // Subtract one day
        const prevDay = moment(currentDate).subtract(i, 'days');

        // Append item to the beginning of the array
        monthDays.unshift(prevDay);
      }
    }

    // Number of days left to fulfill the grid
    const difference = GRID_SIZE - monthDays.length;

    // Fill slots at the end of days list if needed
    if (monthDays.length < GRID_SIZE) {
      for (let i = 1; i <= difference; i++) {
        // Add one day
        const extraDay = moment(monthDays[monthDays.length - i]).add(i, 'days');

        // Append item to the end of the array
        monthDays.push(extraDay);
      }
    }

    return (
      <>
        {monthDays.map(date => (
          <Cell
            key={`monthDay_${date.format('YYYY-MM-DD')}`}
            className={belongsToSelectedMonth(date) ? style.disabled : ''}
            date={date}
          />
        ))}
      </>
    );
  };

  const previousMonth = () => { }
  const nextMonth = () => { }

  return (
    <div className={style.calendar}>
      <div className={style.navigation}>
        <button onClick={previousMonth}>Previous</button>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div className={style.grid}>
        {renderWeekdays()}
        {buildGrid()}
      </div>
    </div>
  );
};

export default Calendar;
