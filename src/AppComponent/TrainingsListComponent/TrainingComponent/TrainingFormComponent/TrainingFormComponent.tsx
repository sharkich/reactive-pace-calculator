import * as React from 'react';
import {FormEvent} from 'react';
import {Atom, F} from '@grammarly/focal';
// tslint:disable-next-line
import './TrainingFormComponent.css';

import {Training} from 'src/_shared/models';
import {AppEvent} from 'src/_shared/AppEvent';
import {TimePipe} from 'src/_shared/pipes/time.pipe';
import {DistancePipe} from 'src/_shared/pipes/distance.pipe';
import {FormRowComponent} from './FormRowComponent/FormRowComponent';
import {FormTrainingService} from 'src/_shared/FormTrainingService';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

export interface Props {
  trainingAtom: Atom<Training>;
  eventAtom: Atom<AppEvent>;
}

export class TrainingFormComponent extends React.Component<Props> {
  eventAtom: Atom<AppEvent>;

  constructor(data: any) {
    super(data);

    this.onClick = this.onClick.bind(this);
  }

  render(): JSX.Element {
    const props: Props = this.props as Props;

    this.eventAtom = props.eventAtom;

    const trainingAtom: Atom<Training> = props.trainingAtom;
    const observable: Observable<JSX.Element> = trainingAtom.pipe(
      map((training: Training) => this.view(training, training.time))
    );

    return <F.div>{observable}</F.div>;
  }

  private view(training: Training, time: number): JSX.Element {
    return (
      <div key={`additional-${training.id}`} className="training-form" onClick={this.onClick}>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()} className="form">
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
            value={TimePipe(time)}
            action={FormTrainingService.ACTION_ACTIVE_TRAINING_SET_TIME}
            eventAtom={this.eventAtom}
          />
        </form>

        <div className="training__additional">
          <div className="training__data__single">
            Name: <span className="mark">{training.name}</span> , Distance:{' '}
            <span className="mark">{training.distance}</span> , Pace:{' '}
            <span className="mark">{training.pace}</span> , Time:{' '}
            <span className="mark">{training.time}</span> , Speed: <span className="mark">x</span>{' '}
            <span className="training__data__additional">km/h</span>,
          </div>
          <div>
            <span className="grey"> ID: {training.id}</span>
          </div>
        </div>
      </div>
    );
  }

  private onClick(event: React.MouseEvent): void {
    event.stopPropagation();
  }
}
