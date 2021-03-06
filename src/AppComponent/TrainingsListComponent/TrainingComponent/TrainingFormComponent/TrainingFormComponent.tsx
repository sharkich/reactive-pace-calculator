import * as React from 'react';
import {FormEvent} from 'react';
import {map} from 'rxjs/operators';
import {Atom, F} from '@grammarly/focal';
import {Observable} from 'rxjs/Observable';
// tslint:disable-next-line
import './TrainingFormComponent.css';

import {Training} from 'src/_shared/models';
import {AppEvent} from 'src/_shared/AppEvent';
import {TimePipe} from 'src/_shared/pipes/time.pipe';
import {DistancePipe} from 'src/_shared/pipes/distance.pipe';
import {FormRowComponent} from './FormRowComponent/FormRowComponent';
import {FormTrainingService} from 'src/_shared/services/FormTrainingService';

export interface Props {
  trainingAtom: Atom<Training>;
  eventAtom: Atom<AppEvent>;
}

export class TrainingFormComponent extends React.Component<Props> {
  eventAtom: Atom<AppEvent>;
  trainingAtom: Atom<Training>;

  constructor(data: any) {
    super(data);

    this.onClick = this.onClick.bind(this);
  }

  render(): JSX.Element {
    const props: Props = this.props as Props;

    this.eventAtom = props.eventAtom;
    this.trainingAtom = props.trainingAtom;

    const observable: Observable<JSX.Element> = this.trainingAtom.pipe(
      map((training: Training) => this.view(training))
    );

    return <F.div>{observable}</F.div>;
  }

  private view(training: Training): JSX.Element {
    return (
      <F.div key={`additional-${training.id}`} className="training-form" onClick={this.onClick}>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()} className="form">
          <FormRowComponent
            trainingAtom={this.trainingAtom}
            label="Training name:"
            field="name"
            action={FormTrainingService.ACTION_ACTIVE_TRAINING_SET_NAME}
            eventAtom={this.eventAtom}
          />

          <FormRowComponent
            trainingAtom={this.trainingAtom}
            label="Distance:"
            field="distance"
            isCalculable={true}
            value={DistancePipe(training.distance)}
            action={FormTrainingService.ACTION_ACTIVE_TRAINING_SET_DISTANCE}
            eventAtom={this.eventAtom}
          />

          <FormRowComponent
            trainingAtom={this.trainingAtom}
            label="Pace:"
            field="pace"
            isCalculable={true}
            value={TimePipe(training.pace)}
            action={FormTrainingService.ACTION_ACTIVE_TRAINING_SET_PACE}
            eventAtom={this.eventAtom}
          />

          <FormRowComponent
            trainingAtom={this.trainingAtom}
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
      </F.div>
    );
  }

  private onClick(event: React.MouseEvent): void {
    event.stopPropagation();
  }
}
