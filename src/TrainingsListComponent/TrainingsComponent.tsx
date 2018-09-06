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
  trainingsAtom: Atom<Trainings>;
  activeTrainingAtom: Atom<Training | null>;
  eventAtom: Atom<AppEvent>;
}

enum NewTrainingPosition {
  Top,
  Bottom
}

export class TrainingsComponent extends React.Component<Props> {

  eventAtom: Atom<AppEvent>;

  trainingsAtom: Atom<Trainings>;
  activeTrainingAtom: Atom<Training | null>;

  trainings: Trainings;

  render(): JSX.Element {
    const props: Props = this.props as Props;

    this.eventAtom = props.eventAtom;

    this.trainingsAtom = props.trainingsAtom;
    this.activeTrainingAtom = props.activeTrainingAtom;

    const existObservable: Observable<JSX.Element> = this.trainingsAtom.pipe(
      filter(this.isExistObservableData),
      map((trainings: Trainings) => {
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
    return trainings.map((training: Training, index: number) => {
      return (
        <TrainingComponent
          key={training.id}
          // @ts-ignore
          trainingAtom={this.trainingsAtom.lens(Lens.key(index))}
          activeTrainingAtom={this.activeTrainingAtom}
          eventAtom={this.eventAtom}
        />
      );
    });
  }

  private onAddTrainingClick(newTrainingPosition: NewTrainingPosition): void {
    switch (newTrainingPosition) {
      case NewTrainingPosition.Top:
        this.eventAtom.set(new AppEvent(AppService.ACTION_ADD_NEW_TRAINING_ON_TOP));
        break;
      case NewTrainingPosition.Bottom:
        this.eventAtom.set(new AppEvent(AppService.ACTION_ADD_NEW_TRAINING_ON_BOTTOM));
        break;
    }
  }

  private emptyView(): JSX.Element {
    return (
      <div className="trainings-list--empty">No Trainings</div>
    );
  }

  private isExistObservableData(trainings: Trainings): boolean {
    return !!trainings.length;
  }

  private isEmptyObservableData(trainings: Trainings): boolean {
    return !this.isExistObservableData(trainings);
  }
}
