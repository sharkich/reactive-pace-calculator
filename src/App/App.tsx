import * as React from 'react';

// tslint:disable-next-line
import './App.css';

import image from './usain-bolt.jpg';

class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reactive Pace Calculator</h1>
        </header>

        <p className="App-content">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>

        <footer className="App-footer">
          <img src={image} className="App-image" alt="Usain Bolt" />
        </footer>
      </div>
    );
  }
}

export default App;
