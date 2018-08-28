import * as React from 'react';

import {Training, Trainings} from './training.model';
import {Atom, F} from '@grammarly/focal';

export function TrainingsComponent(props: { trainings: Atom<Trainings> }): JSX.Element {
  return (
    <F.div>
      <h2>Trainings</h2>
      {
      props.trainings.view((trainings: Trainings) => {
        if (!trainings) {
          return <div>No Trainings</div>;
        }
        return Object.keys(trainings).map((id: string) => {
          const training: Training = trainings[id];
          return <div key={training.id}>ID: [{training.id}]</div>;
        });
      })
    }
    </F.div>
  );
}
