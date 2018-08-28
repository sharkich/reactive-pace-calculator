import * as React from 'react';
import {Atom, F} from '@grammarly/focal';

// @ts-ignore
import {Training} from '../Trainings/training.model';

export function PaceCalculatorComponent(props: { training: Atom<Training | null> }): JSX.Element {
  return (
    <F.div>
      <h2>Calculate</h2>
      ID: [{props.training.view((x: Training | null) => x && x.id)}]
    </F.div>
  );
}
