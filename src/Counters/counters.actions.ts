import {Counter} from './counter.model';

export function incCounterAction(counter: Counter): void {
  console.log('inc', counter);
}

export function decCounterAction(counter: Counter): void {
  console.log('dec', counter);
}
