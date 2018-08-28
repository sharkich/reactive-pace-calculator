import * as React from 'react';
import {Atom} from '@grammarly/focal';

// tslint:disable-next-line
import './App.css';
import image from './usain-bolt.jpg';

import {AppModel} from './App.model';
import {TrainingsComponent} from '../Trainings/trainings.component';
import {PaceCalculatorComponent} from '../PaceCalculator/pace-calculator.component';
import {Training, Trainings} from '../Trainings/training.model';

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
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reactive Pace Calculator</h1>
        </header>

        <div className="App-content">
          <PaceCalculatorComponent training={activeTraining} />
          <TrainingsComponent trainings={trainings} />
        </div>

        <footer className="App-footer">
          <img src={image} className="App-image" alt="Usain Bolt" />
        </footer>
      </div>
    );
  }
}
