import React, { useState } from 'react';

import classNames from 'classnames';

import style from './App.module.scss';

const App: React.FC = () => {

  const weekDays: String[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thurday',
    'Friday',
    'Saturday'
  ];
  const GRID_SIZE: number = 5 * 7;
  const today: Date = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));

  const renderWeekdays = (): React.ReactFragment => {
    return (
      <>
        {weekDays.map(day => (<div className={style.header} key={`weekDay_${day}`}>{day}</div>))}
      </>
    );
  }

  const getDaysInMonth = (month: number, year: number): Date[] => {
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  const buildGrid = (): React.ReactFragment => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const monthDays = getDaysInMonth(month, year);

    // First week day of selected month
    const startingWeekday = monthDays[0].getDay();

    // If the month doesn't starts on monday, fill the gap before
    if (startingWeekday > 1) {
      for (let i = 1; i < startingWeekday; i++) {
        // Clone selectedDate
        const prevDay = new Date(selectedDate.getTime());

        // Subtract one day
        prevDay.setDate(prevDay.getDate() - i);

        // Append item to the beginning of the array
        monthDays.unshift(prevDay);
      }
    }

    // 
    const difference = GRID_SIZE - monthDays.length;

    // Fill slots available at the end of days list
    if (monthDays.length < GRID_SIZE) {
      for (let i = 1; i <= difference; i++) {
        // Clone selectedDate
        const extraDay = new Date(monthDays[monthDays.length - i].getTime());

        // Add one day
        extraDay.setDate(extraDay.getDate() + i);

        // Append item to the end of the array
        monthDays.push(extraDay);
      }
    }

    return (
      <>
        {
          monthDays.map(d => (
            <div
              key={`monthDay_${d.toLocaleString()}`}
              className={classNames(style.cell, d.getMonth() !== month && style.disabled)}
            >
              {d.getDate()}
            </div>
          ))
        }
      </>
    );
  }

  return (
    <div id="calendar" className={style.calendar}>
      {renderWeekdays()}
      {buildGrid()}
    </div>
  );
}

export default App;
