// Deps
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import moment, { Moment } from 'moment';
import uuid from 'uuid/v4';

// Components
import Button from '@material-ui/core/Button';
import Cell from './Cell';
import ReminderEditor from './ReminderEditor';

// Types
import Reminder, { ReminderList } from '../../types/Reminder';

// Redux
import { AppState } from '../../reducers/rootReducer';
import { AppActions } from '../../actions';
import {
  createReminder,
  updateReminder,
  buildCalendarPage,
} from '../../actions/calendar/calendarActions';

// Styles
import style from './Calendar.module.scss';
import { CalendarPage } from '../../types/CalendarPage';

type DispatchToProps = {
  createReminder: (item: Reminder) => void;
  updateReminder: (item: Reminder) => void;
  buildCalendarPage: (date: Moment) => void;
};

type StateToProps = {
  currentView: Moment,
  reminders: ReminderList;
  page: CalendarPage;
};

type Props = DispatchToProps & StateToProps;

const Calendar: React.FC<Props> = (props) => {
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
  const [selectedReminder, setSelectedReminder] = useState<Reminder>();
  const { buildCalendarPage } = props

  useEffect(() => {
    buildCalendarPage(moment().startOf('month'));
  }, [buildCalendarPage])

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

  const belongsToSelectedMonth = (date: Moment) => {
    const { currentView } = props;
    return date.format('MM') !== currentView.format('MM');
  }

  const buildGrid = (): React.ReactFragment => {
    const { page: monthDays = [] } = props;

    return (
      <>
        {monthDays.map(date => (
          <Cell
            key={`monthDay_${date.format('YYYY-MM-DD')}`}
            className={belongsToSelectedMonth(date) ? style.disabled : ''}
            onClickEvent={onClickEvent}
            events={props.reminders}
            date={date}
          />
        ))}
      </>
    );
  };

  const previousMonth = (): void => props.buildCalendarPage(moment(props.currentView).subtract(1, 'months'));
  const nextMonth = (): void => props.buildCalendarPage(moment(props.currentView).add(1, 'months'));

  const onClickEvent = (reminder: Reminder): void => {
    setSelectedReminder(reminder);
  }

  const unSelectEvent = (): void => setSelectedReminder(undefined);

  const onSaveEvent = (reminder: Reminder): void => {
    const { createReminder, updateReminder } = props;
    if (reminder.id) {
      // edit
      updateReminder(reminder);
    } else {
      // create new, add id
      createReminder({ ...reminder, id: uuid() });
    }
  }

  return (
    <>
      <div className={style.calendar}>
        <div className={style.navigation}>
          <Button variant="contained" size="small" color="primary" onClick={previousMonth}>Previous</Button>
          <h1>{props.currentView.format('MMMM YYYY')}</h1>
          <Button variant="contained" size="small" color="primary" onClick={nextMonth}>Next</Button>
        </div>

        <div className={style.grid}>
          {renderWeekdays()}
          {buildGrid()}
        </div>
      </div>
      {selectedReminder && (
        <ReminderEditor
          reminder={selectedReminder}
          onClose={unSelectEvent}
          onSave={onSaveEvent}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: AppState): StateToProps => ({
  currentView: state.calendar.currentView,
  reminders: state.calendar.reminders,
  page: state.calendar.page,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): DispatchToProps => ({
  createReminder: bindActionCreators(createReminder, dispatch),
  updateReminder: bindActionCreators(updateReminder, dispatch),
  buildCalendarPage: bindActionCreators(buildCalendarPage, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
