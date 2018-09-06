import * as moment from 'moment';
import {Duration} from 'moment';

// ts-lint:disabled
window['moment'] = moment;

export function TimePipe(input: number): string {
  const duration: Duration = moment.duration({
    seconds: input
  });
  const hours: string = addZero(duration.hours());
  const minutes: string = addZero(duration.minutes());
  const seconds: string = addZero(duration.seconds());
  if (+hours) {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function addZero(input: number): string {
  const inputString: string = '' + input;
  if (inputString.length >= 2) {
    return inputString;
  }
  return '0' + inputString;
}
