// Deps
import React, { ChangeEvent, useState, useEffect } from 'react';
import moment, { Moment } from 'moment'
import classNames from 'classnames';

// Types
import Reminder from '../../../types/Reminder';

// Components
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { SliderPicker, ColorResult } from 'react-color';

// Styles
import style from './ReminderEditor.module.scss';

type Props = {
  onClose: () => void,
  reminder: Reminder,
  onSave: (reminder: Reminder) => void,
}

const EventEditor: React.FC<Props> = ({ onClose, reminder, onSave }) => {
  const [state, setState] = useState<Reminder>(reminder);

  useEffect(() => {
    setState(reminder);
  }, [reminder]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(state);
    onClose();
  };

  const onChange = (event: ChangeEvent<{ name?: string; value: any; }>) => {
    const { value, name } = event.target;
    if (value) {
      setState({ ...state, [String(name)]: value });
    }
  }

  const onChangeColor = (color: ColorResult) => {
    setState({ ...state, color: color.hex });
  }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={true}
      onClose={onClose}
    >
      <div className={style.paper}>
        <h2 className="title">Add an event</h2>
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
              onChange={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className={classNames(style.formRow, style.formRowFlex)}>
            <TextField
              id="eventCity"
              name="city"
              label="City"
              className={style.field}
              value={state.city}
              onChange={onChange}
            />

            <Select
              labelId="eventCountry"
              id="eventCountry"
              name="country"
              value={state.country}
              onChange={onChange}>
              <MenuItem value="US">USA</MenuItem>
              <MenuItem value="BR">Brazil</MenuItem>
            </Select>
          </div>

          <div className={style.formRow}>
            <SliderPicker
              color={state.color}
              onChange={onChangeColor}
            />
          </div>

          <div className={style.buttonBar}>
            <Button variant="contained" onClick={onClose}>Cancel</Button>

            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal >)
}

export default EventEditor;
