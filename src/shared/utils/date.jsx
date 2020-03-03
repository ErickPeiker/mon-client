import moment from 'moment'

export const roundTo5Minutes = (date) => {
  let momentDate = moment.isMoment(date) ? moment(date) : moment();
  let minutesAdjusted = (momentDate.minutes() - momentDate.minutes() % 5)
  return momentDate.set({'minute': minutesAdjusted, 'second': 0});
}

export const addHours = (date, hour) => {
  let momentDate = moment.isMoment(date) ? moment(date) : moment();
  return momentDate.add(hour, 'hours');;
}

export const subtractHours = (date, hour) => {
  let momentDate = moment.isMoment(date) ? moment(date) : moment();
  return momentDate.subtract(hour, 'hours');;
}

export const subtractMinutes = (date, minutes) => {
  let momentDate = moment.isMoment(date) ? moment(date) : moment();
  return momentDate.subtract(minutes, 'minutes');;
}

export const momentToDateTimePickerField = (date) => {
  let momentDate = moment.isMoment(date) ? moment(date) : moment();
  return momentDate.format('YYYY-MM-DD HH:mm');
}

export const dateTimePickerFieldToMoment = (dateFormatted) => {
  return moment(dateFormatted, 'YYYY-MM-DD HH:mm');
}
