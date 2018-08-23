import * as React from 'react';

import {Atom, F} from '@grammarly/focal';

// tslint:disable-next-line
import './App.css';
import image from './usain-bolt.jpg';

import CountersList from '../Counters/counters-list.component';

class App extends React.Component {
  public render(): JSX.Element {
    console.log('App.render');
    const state: Atom<{count: number}> = Atom.create({count: 7});
    state.subscribe((x: {count: number}) => {
      console.log(`New app state: ${JSON.stringify(x)}`);
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reactive Pace Calculator</h1>
          <hr />
          <F.div>
            {/* embed the state atom directly in JSX */}
            Count: {state.view((x: {count: number}) => x.count)}
          </F.div>
        </header>

        <div className="App-content">
          <CountersList />
        </div>

        <footer className="App-footer">
          <img src={image} className="App-image" alt="Usain Bolt" />
        </footer>
      </div>
    );
  }
}

export default App;
