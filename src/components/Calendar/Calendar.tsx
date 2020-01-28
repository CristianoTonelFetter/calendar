import React, { useState } from 'react';

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
  const today: Date = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));

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

  const getDaysInMonth = (month: number, year: number): Date[] => {
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

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

    // Number of days left to fulfill the grid
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
        {monthDays.map(date => (
          <Cell
            key={`monthDay_${date.toLocaleString()}`}
            monthOfDisplay={month}
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
