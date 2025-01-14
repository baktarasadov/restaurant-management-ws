import * as moment from 'moment-timezone';

export function isValidTimezone(timezone: string): boolean {
  return moment.tz.zone(timezone) !== null;
}
