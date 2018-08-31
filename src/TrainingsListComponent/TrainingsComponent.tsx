import * as React from 'react';
import {Atom, F, Lens, reactiveList} from '@grammarly/focal';

// tslint:disable-next-line
import './TrainingsComponent.css';

import {AppEvent} from '../_shared/AppEvent';
import {Training, Trainings} from '../_shared/models';
import {TrainingComponent} from '../TrainingComponent/TrainingComponent';

interface Props {
  trainings: Atom<Trainings>;
  activeTraining: Atom<Training | null>;
  event: Atom<AppEvent>;
}

export class TrainingsComponent extends React.Component {
  render(): JSX.Element {
    const props: Props = this.props as Props;
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
                event={props.event}
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
}
