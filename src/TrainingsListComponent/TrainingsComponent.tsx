import * as React from 'react';
import {Atom, F, Lens, reactiveList} from '@grammarly/focal';

// tslint:disable-next-line
import './TrainingsComponent.css';

import {Training} from '../_shared/Training.model';
import {Trainings} from '../_shared/Trainings.model';
import {TrainingComponent} from '../TrainingComponent/TrainingComponent';

export function TrainingsComponent(props: {
  trainings: Atom<Trainings>;
  activeTraining: Atom<Training | null>;
}): JSX.Element {
  return (
    <F.div className="trainings-list card">
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
        <div className="trainings-list__header">
          <button>Add training</button>
        </div>

        {reactiveList(
          props.trainings.view((trainings: Trainings) => Object.keys(trainings)),
          (id: string) => (
            <TrainingComponent
              key={id}
              // @ts-ignore
              training={props.trainings.lens(Lens.key(id))}
              activeTraining={props.activeTraining}
            />
          )
        )}

        <div className="trainings-list__footer">
          <button>Add training</button>
        </div>
      </F.div>
    </F.div>
  );
}
