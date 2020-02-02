import moment, { Moment } from 'moment';

const getDaysInMonth = (currentDate: Moment): Moment[] => {
  const newDate = moment(currentDate);
  const days = [moment(newDate)];

  while (newDate.format('YYYY/MM') === currentDate.format('YYYY/MM')) {
    const pushDate = moment(newDate.add(1, 'days'));
    days.push(pushDate);
  }

  return days;
};

export default getDaysInMonth;
