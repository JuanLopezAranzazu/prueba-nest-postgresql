const extractFormatDate = (stringDate: string) => {
  const [dateValues, timeValues] = stringDate.split(' ');
  const [month, day, year] = dateValues.split('/');
  const [hours, minutes, seconds] = timeValues.split(':');
  const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
  return date.toISOString();
};

export default { extractFormatDate };
