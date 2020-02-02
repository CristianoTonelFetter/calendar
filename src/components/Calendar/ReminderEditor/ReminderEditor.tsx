// Deps
import React, { ChangeEvent, useState, useEffect } from 'react';
import { get } from 'lodash'
import moment from 'moment'

// Types
import Reminder from '../../../types/Reminder';

// Components
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { SliderPicker, ColorResult } from 'react-color';

// Styles
import style from './ReminderEditor.module.scss';

let forecastTimeout: NodeJS.Timeout;
let isMounted: boolean = false;

type Props = {
  onClose: () => void,
  reminder: Reminder,
  onSave: (reminder: Reminder) => void,
  onDelete: (reminder: Reminder) => void,
}

const EventEditor: React.FC<Props> = ({ onClose, reminder, onSave, onDelete }) => {
  const [state, setState] = useState<Reminder>(reminder);
  const [weather, setWeather] = useState();

  const forecastTimeoutCleanup = () => {
    if (forecastTimeout) {
      clearTimeout(forecastTimeout);
    }
  }

  useEffect(() => {
    setState(reminder);
  }, [reminder]);

  useEffect(() => {
    // debounce requests to the weather api
    forecastTimeoutCleanup();

    isMounted = true;

    forecastTimeout = setTimeout(async () => {
      try {
        const data = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${state.city}&APPID=3c48573221636e07f91eb463895bb1bb&cnt=40`);

        if (data.status === 200) {
          const weatherData = await data.json();

          // Search for available weather data
          const foundData = weatherData.list
            .find((item: any, index: number) => moment(state.dateTime)
              // test if the current date is between one of the intervals on the list
              .isBetween(
                moment(item.dt_txt, 'YYYY-MM-DD hh:mm:ss'),
                moment(get(weatherData.list, `[${index + 1}].dt_txt`), 'YYYY-MM-DD hh:mm:ss'),
                'hour'
              ) || moment(state.dateTime).isSame(moment(item.dt_txt, 'YYYY-MM-DD hh:mm:ss')));
          if (isMounted) setWeather(get(foundData, 'weather[0].description', 'unavailable'));
        } else {
          if (isMounted) setWeather('unavailable');
        }
      } catch (error) {
        console.error("Get weather error: ", error)
      }
    }, 200);

    return () => {
      isMounted = false;
      forecastTimeoutCleanup();
    }
  }, [state.city, state.dateTime, weather]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(state);
    onClose();
  };

  const onChange = async (event: ChangeEvent<{ name?: string; value: any; }>) => {
    const { value = '', name = '' } = event.target;

    setState({ ...state, [name]: value });
  }

  const onChangeDate = async (event: ChangeEvent<{ name?: string; value: any; }>) => {
    const { value = '', name = '' } = event.target;

    setState({ ...state, [name]: moment(value).toDate() });
  }

  const onChangeColor = (color: ColorResult) => {
    setState({ ...state, color: color.hex });
  }

  const deleteReminder = (): void => {
    onDelete(reminder);
    onClose();
  }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={true}
      onClose={onClose}
    >
      <div className={style.paper}>
        <h2 className="title">Add a reminder</h2>
        <form className={style.eventForm} onSubmit={handleSubmit} noValidate>
          <div className={style.formRow}>
            <TextField
              id="eventTitle"
              name="title"
              label="Title"
              value={state.title}
              className={style.field}
              onChange={onChange}
            />
          </div>

          <div className={style.formRow}>
            <TextField
              id="eventDateTime"
              name="dateTime"
              label="Date &amp; time"
              type="datetime-local"
              value={moment(state.dateTime).format('YYYY-MM-DDTHH:mm')}
              className={style.field}
              onChange={onChangeDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className={style.formRow}>
            <TextField
              id="eventCity"
              name="city"
              label="City"
              className={style.field}
              value={state.city}
              onChange={onChange}
            />
          </div>

          <div className={style.formRow}>
            <SliderPicker
              color={state.color}
              onChange={onChangeColor}
            />
          </div>

          <div className={style.formRow}>
            <div className={style.forecastBox}>
              <strong>Weather:</strong> {weather || 'unavailable'}
            </div>
          </div>

          <div className={style.buttonBar}>
            <div>
              {reminder.id && (
                <Button variant="contained" color="secondary" onClick={deleteReminder}>Delete</Button>
              )}
            </div>
            <div>
              <Button variant="contained" onClick={onClose}>Cancel</Button>

              <Button variant="contained" color="primary" type="submit">
                Save
            </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal >)
}

export default EventEditor;
