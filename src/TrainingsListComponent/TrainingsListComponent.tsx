import * as React from 'react';

import {Trainings} from './training.model';
import {Atom, F, Lens, reactiveList} from '@grammarly/focal';
import {SingleTrainingComponent} from '../SingleTrainingComponent/SingleTrainingComponent';

export function TrainingsListComponent(props: {trainings: Atom<Trainings>}): JSX.Element {
  return (
    <div className="trainings-list card">
      <h2>Trainings</h2>
      <F.div>
        {props.trainings.view((trainings: Trainings) => {
          if (!trainings) {
            return <div className="trainings-list--empty">No Trainings</div>;
          }
          return <div />;
        })}
      </F.div>

      <F.div className="trainings-list--not-empty">
        {reactiveList(
          props.trainings.view((trainings: Trainings) => Object.keys(trainings)),
          (id: string) => (
            <SingleTrainingComponent
              key={id}
              // @ts-ignore
              training={props.trainings.lens(Lens.key(id))}
            />
          )
        )}
      </F.div>
    </div>
  );
}
