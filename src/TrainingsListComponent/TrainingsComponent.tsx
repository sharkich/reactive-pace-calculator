import * as React from 'react';
import {Observable} from 'rxjs/Observable';
import {filter, map, merge} from 'rxjs/operators';
import {Atom, F, Lens} from '@grammarly/focal';

// tslint:disable-next-line
import './TrainingsComponent.css';

import {AppEvent} from '../_shared/AppEvent';
import {Training, Trainings} from '../_shared/models';
import {TrainingComponent} from '../TrainingComponent/TrainingComponent';
import {AppService} from '../_shared/AppService';

interface Props {
  trainings: Atom<Trainings>;
  activeTraining: Atom<Training | null>;
  event: Atom<AppEvent>;
}

enum NewTrainingPosition {
  Top,
  Bottom
}

export class TrainingsComponent extends React.Component {

  trainings: Trainings;
  activeTraining: Training | null;
  event: Atom<AppEvent>;

  trainingsAtom: Atom<Trainings>;
  activeTrainingAtom: Atom<Training | null>;

  render(): JSX.Element {
    const props: Props = this.props as Props;

    this.trainingsAtom = props.trainings;
    this.activeTrainingAtom = props.activeTraining;

    this.event = props.event;

    const existObservable: Observable<JSX.Element> = this.trainingsAtom.pipe(
      filter(this.isExistObservableData),
      map((trainings: Trainings) => {
        console.log('new trainings', trainings);
        this.trainings = trainings;
        return this.view(trainings);
      })
    );

    const emptyObservable: Observable<JSX.Element> = this.trainingsAtom.pipe(
      filter(this.isEmptyObservableData.bind(this)),
      map(() => this.emptyView())
    );

    return (
      <F.div className="trainings-list card">
        <h2>Trainings</h2>
        <F.div>{existObservable.pipe(merge(emptyObservable))}</F.div>
      </F.div>
    );
  }

  private view(trainings: Trainings): JSX.Element {
    return (
      <F.div className="trainings-list--not-empty">
        <div className="trainings-list__header">
          <button onClick={() => this.onAddTrainingClick(NewTrainingPosition.Top)}>Add training</button>
        </div>

        {this.renderTrainingsComponents(trainings)}

        <div className="trainings-list__footer">
          <button onClick={() => this.onAddTrainingClick(NewTrainingPosition.Bottom)}>Add training</button>
        </div>
      </F.div>
    );
  }

  private renderTrainingsComponents(trainings: Trainings): JSX.Element[] {
    return Object.keys(trainings).map((id: string) => {
      return (
        <TrainingComponent
          key={id}
          // @ts-ignore
          training={this.trainingsAtom.lens(Lens.key(id))}
          activeTraining={this.activeTrainingAtom}
          event={this.event}
        />
      );
    });
  }

  private onAddTrainingClick(newTrainingPosition: NewTrainingPosition): void {
    switch (newTrainingPosition) {
      case NewTrainingPosition.Top:
        this.event.set(new AppEvent(AppService.ACTION_ADD_NEW_TRAINING_ON_TOP));
        break;
      case NewTrainingPosition.Bottom:
        this.event.set(new AppEvent(AppService.ACTION_ADD_NEW_TRAINING_ON_BOTTOM));
        break;
    }
  }

  private emptyView(): JSX.Element {
    return (
      <div className="trainings-list--empty">No Trainings</div>
    );
  }

  private isExistObservableData(trainings: Trainings): boolean {
    return !!Object.keys(trainings);
  }

  private isEmptyObservableData(trainings: Trainings): boolean {
    return !this.isExistObservableData(trainings);
  }
}
