import * as React from 'react';
import {Atom} from '@grammarly/focal';

// tslint:disable-next-line
import './App.css';
import image from '../static/usain-bolt.jpg';

import {AppModel} from './App.model';
import {TrainingsListComponent} from '../TrainingsListComponent/TrainingsListComponent';
import {SingleTrainingComponent} from '../SingleTrainingComponent/SingleTrainingComponent';
import {Training, Trainings} from '../TrainingsListComponent/training.model';

export class AppComponent extends React.Component<any, any> {
  componentDidMount(): void {
    console.log('mount.app');
    const state: Atom<AppModel> = this.props.state;
    state.subscribe((newState: AppModel) => {
      console.log('state.newState', newState);
    });
  }

  render(): JSX.Element {
    const state: Atom<AppModel> = this.props.state;

    const activeTraining: Atom<Training | null> = state.lens('activeTraining');
    activeTraining.subscribe((newTraining: Training) => {
      console.log('activeTraining', newTraining);
    });

    const trainings: Atom<Trainings> = state.lens('trainings');
    trainings.subscribe((newTrainings: Trainings) => {
      console.log('trainings', newTrainings);
    });

    return (
      <div className="app main">
        <header className="app__header">
          <h1 className="app__header__title">Reactive Pace Calculator</h1>
        </header>

        <div className="app__content">
          <SingleTrainingComponent training={activeTraining} />
          <TrainingsListComponent trainings={trainings} />
        </div>

        <footer className="app__footer">
          <img src={image} className="app__footer__image" alt="Usain Bolt" />
        </footer>
      </div>
    );
  }
}
