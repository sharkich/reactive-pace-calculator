import * as React from 'react';
import {Atom, F} from '@grammarly/focal';

// tslint:disable-next-line
import './AppComponent.css';
import image from '../_static/usain-bolt.jpg';

import {AppModel} from './AppModel';
import {Training, Trainings} from '../_shared/Training.model';
import {TrainingsComponent} from '../TrainingsListComponent/TrainingsComponent';

export class AppComponent extends React.Component<any, any> {
  componentDidMount(): void {
    const state: Atom<AppModel> = this.props.state;
    state.subscribe((newState: AppModel) => {
      console.log('state.newState', newState);
    });
  }

  render(): JSX.Element {
    const state: Atom<AppModel> = this.props.state;
    const activeTraining: Atom<Training | null> = state.lens('activeTraining');
    const trainings: Atom<Trainings> = state.lens('trainings');
    return (
      <F.div className="app main">
        <header className="app__header">
          <h1 className="app__header__title">Reactive Pace Calculator</h1>
        </header>

        <div className="app__content">
          <TrainingsComponent trainings={trainings} activeTraining={activeTraining} />
        </div>

        <footer className="app__footer">
          <img src={image} className="app__footer__image" alt="Usain Bolt" />
        </footer>
      </F.div>
    );
  }
}
