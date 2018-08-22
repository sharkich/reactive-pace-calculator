import {Counter} from './counter.model';

export function countersReducer(): Counter[] {
  return [
    new Counter(),
    new Counter({value: 10}),
    new Counter({value: 100, name: 'Hundred\n'})
  ];
}
