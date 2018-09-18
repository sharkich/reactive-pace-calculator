import * as React from 'react';
import {Atom, F} from '@grammarly/focal';
// tslint:disable-next-line
import './AppComponent.css';
import image from '../_static/usain-bolt.jpg';

import {AppEvent} from 'src/_shared/AppEvent';
import {AppModel} from 'src/AppComponent/AppModel';
import {Training, Trainings} from 'src/_shared/models';
import {AppService} from 'src/_shared/services/AppService';
import {APP_DEFAULT_STATE} from 'src/AppComponent/APP_DEFAULT_STATE';
import {TrainingsComponent} from './TrainingsListComponent/TrainingsComponent';

export class AppComponent extends React.Component {
  stateAtom: Atom<AppModel> = Atom.create(new AppModel(APP_DEFAULT_STATE));
  eventAtom: Atom<AppEvent> = Atom.create(new AppEvent('init'));
  appService: AppService = new AppService(this.stateAtom, this.eventAtom);

  componentDidMount(): void {
    this.appService.subscribe();
  }

  componentWillUnmount(): void {
    this.appService.unsubscribe();
  }

  render(): JSX.Element {
    const activeTrainingAtom: Atom<Training | null> = this.stateAtom.lens('activeTraining');
    const trainingsAtom: Atom<Trainings> = this.stateAtom.lens('trainings');
    return (
      <F.div className="app main">
        <header className="app__header">
          <h1 className="app__header__title">Reactive Pace Calculator</h1>
        </header>

        <div className="app__content">
          <TrainingsComponent
            // @ts-ignore
            trainingsAtom={trainingsAtom}
            activeTrainingAtom={activeTrainingAtom}
            eventAtom={this.eventAtom}
          />
        </div>

        <footer className="app__footer">
          <img src={image} className="app__footer__image" alt="Usain Bolt" />
          <br />
          <span className="small grey">
            &copy; Usain Bolt snapped by Cameron Spencer for Getty Images
          </span>
        </footer>
      </F.div>
    );
  }
}
