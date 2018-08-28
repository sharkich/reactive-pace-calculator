import * as React from 'react';
import {Atom, F, Lens, reactiveList} from '@grammarly/focal';

// tslint:disable-next-line
import './TrainingsList.css';

import {Trainings} from './training.model';
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

        <div className="trainings-list__header">
          <button>Add training</button>
        </div>

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

        <div className="trainings-list__footer">
          <button>Add training</button>
        </div>

      </F.div>
    </div>
  );
}
