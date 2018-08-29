import * as React from 'react';
import {Atom, classes, F} from '@grammarly/focal';

// tslint:disable-next-line
import './TrainingComponent.css';

import {Training} from '../_shared/Training.model';
import {TrainingFooterComponent} from '../TrainingFooterComponent/TrainingFooterComponent';

export interface Props {
  training: Atom<Training | null>;
  activeTraining: Atom<Training | null>;
}

export class TrainingComponent extends React.Component {
  render(): JSX.Element {
    const props: Props = this.props as Props;
    const trainingAtom: Atom<Training | null> = props.training;
    const activeTrainingAtom: Atom<Training | null> = props.activeTraining;
    return (
      <F.div>
        {trainingAtom.view((training: Training | null) => {
          if (!training) {
            return <div>Loading...</div>;
          }

          return (
            <F.div
              onClick={() => this.onClick(training)}
              {...classes(
                activeTrainingAtom.view(
                  (activeTraining: Training) => activeTraining === training && 'training--active'
                ),
                'training card'
              )}
            >
              <div>
                <h2 className="training__title">{training.name}</h2>
                <div className="training__data">
                  <F.div className="training__data__single">
                    Distance: <span className="mark">{training.distance}</span>{' '}
                    <span className="training__data__additional">km,</span>
                  </F.div>
                  <F.div className="training__data__single">
                    Pace: <span className="mark">{training.pace}</span>{' '}
                    <span className="training__data__additional">min/km</span>,
                  </F.div>
                  <div className="training__data__single">
                    Time: <span className="mark">{training.time}</span>
                  </div>
                </div>
              </div>
              <TrainingFooterComponent
                // @ts-ignore
                training={trainingAtom}
                activeTraining={activeTrainingAtom}
              />
            </F.div>
          );
        })}
      </F.div>
    );
  }

  private onClick(training: Training): void {
    const props: Props = this.props as Props;
    const activeTrainingAtom: Atom<Training | null> = props.activeTraining;
    activeTrainingAtom.set(training);
  }
}
