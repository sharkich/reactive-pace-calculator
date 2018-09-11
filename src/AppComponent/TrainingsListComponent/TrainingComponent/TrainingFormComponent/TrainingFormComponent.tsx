import * as React from 'react';
import {FormEvent} from 'react';
import {Atom} from '@grammarly/focal';
// tslint:disable-next-line
import './TrainingFormComponent.css';

import {Training} from 'src/_shared/models';
import {AppEvent} from 'src/_shared/AppEvent';
import {TimePipe} from 'src/_shared/pipes/time.pipe';
import {DistancePipe} from 'src/_shared/pipes/distance.pipe';
import {FormRowComponent} from './FormRowComponent/FormRowComponent';
import {FormTrainingService} from 'src/_shared/FormTrainingService';

export interface Props {
  training: Training;
  activeTraining: Training | null;
  eventAtom: Atom<AppEvent>;
}

export class TrainingFormComponent extends React.Component<Props> {

  eventAtom: Atom<AppEvent>;

  render(): JSX.Element {
    const props: Props = this.props as Props;

    this.eventAtom = props.eventAtom;

    const training: Training = props.training;
    const activeTraining: Training | null = props.activeTraining;

    if (training && training.theSame(activeTraining)) {
      return this.view(training);
    }

    return this.emptyView(training);
  }

  private view(training: Training): JSX.Element {
    return (
      <div
        key={`additional-${training.id}`}
        className="training-form"
      >

        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
          className="form"
        >

          <FormRowComponent
            training={training}
            label="Training name:"
            field="name"
            action={FormTrainingService.ACTION_ACTIVE_TRAINING_SET_NAME}
            eventAtom={this.eventAtom}
          />

          <FormRowComponent
            training={training}
            label="Distance:"
            field="distance"
            isCalculable={true}
            value={DistancePipe(training.distance)}
            action={FormTrainingService.ACTION_ACTIVE_TRAINING_SET_DISTANCE}
            eventAtom={this.eventAtom}
          />

          <FormRowComponent
            training={training}
            label="Pace:"
            field="pace"
            isCalculable={true}
            value={TimePipe(training.pace)}
            action={FormTrainingService.ACTION_ACTIVE_TRAINING_SET_PACE}
            eventAtom={this.eventAtom}
          />

          <FormRowComponent
            training={training}
            label="Time:"
            field="time"
            isCalculable={true}
            value={TimePipe(training.time)}
            action={FormTrainingService.ACTION_ACTIVE_TRAINING_SET_TIME}
            eventAtom={this.eventAtom}
          />

        </form>

        <div className="training__additional">
          <div className="training__data__single">
            Name: <span className="mark">{training.name}</span>{' '},
            Distance: <span className="mark">{training.distance}</span>{' '},
            Pace: <span className="mark">{training.pace}</span>{' '},
            Time: <span className="mark">{training.time}</span>{' '},

            Speed:{' '}
            <span className="mark">x</span>{' '}
            <span className="training__data__additional">km/h</span>,
          </div>
          <div>
            <span className="grey"> ID: {training.id}</span>
          </div>
        </div>
      </div>
    );
  }

  private emptyView(training: Training): JSX.Element {
    return <div key={`additional-${training.id}`} />;
  }
}
