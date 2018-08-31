import * as React from 'react';
import {Atom, F} from '@grammarly/focal';

// tslint:disable-next-line
import './AppComponent.css';
import image from '../_static/usain-bolt.jpg';

import {AppModel} from './AppModel';
import {AppEvent} from '../_shared/AppEvent';
import {AppService} from '../_shared/AppService';
import {Training, Trainings} from '../_shared/models';
import {APP_DEFAULT_STATE} from './APP_DEFAULT_STATE';
import {TrainingsComponent} from '../TrainingsListComponent/TrainingsComponent';

export class AppComponent extends React.Component {

  state: Atom<AppModel> = Atom.create(new AppModel(APP_DEFAULT_STATE));
  event: Atom<AppEvent> = Atom.create(new AppEvent('init'));
  service: AppService = new AppService(this.state, this.event);

  // componentDidMount(): void {
  //   this.state.subscribe((newState: AppModel) => {
  //     console.log('state.newState', newState);
  //   });
  // }

  render(): JSX.Element {
    const activeTraining: Atom<Training | null> = this.state.lens('activeTraining');
    const trainings: Atom<Trainings> = this.state.lens('trainings');
    return (
      <F.div className="app main">
        <header className="app__header">
          <h1 className="app__header__title">Reactive Pace Calculator</h1>
        </header>

        <div className="app__content">
          <TrainingsComponent
            // @ts-ignore
            trainings={trainings}
            activeTraining={activeTraining}
            event={this.event}
          />
        </div>

        <footer className="app__footer">
          <img src={image} className="app__footer__image" alt="Usain Bolt" />
        </footer>
      </F.div>
    );
  }
}
