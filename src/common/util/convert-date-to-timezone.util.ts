import * as moment from 'moment-timezone';

const formatDateTimeZone = (date: Date, timeZone: string): string => {
  const utcTime = moment.utc(date);
  const convertedTime = utcTime.tz(timeZone);
  return convertedTime.toString();
};

export const convertDateToTimeZone = <T extends IHasDates>(
  data: T,
  timeZone: string,
) => {
  const createdAt = formatDateTimeZone(data.createdAt, timeZone);
  const updatedAt = formatDateTimeZone(data.updatedAt, timeZone);

  return {
    ...data,
    createdAt,
    updatedAt,
  };
};

interface IHasDates {
  createdAt: Date;
  updatedAt: Date;
}
