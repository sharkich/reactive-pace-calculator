import * as React from 'react';
import {connect} from 'react-redux';

import {AppState} from '../App/app.state';
import {Counter} from './counter.model';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import {decCounterAction, incCounterAction} from './counters.actions';

type CountersListState = Pick<AppState, 'counters'>;

class CountersList extends React.Component {

  render(): JSX.Element {
    return (
      <div>
        <h2>Counters List</h2>
        <ul>
          {this.renderCounter()}
        </ul>
      </div>
    );
  }

  renderCounter(): JSX.Element[] {
    const counters: Counter[] = this.props['counters'];
    if (!counters) {
      return [(
        <li key={0}><i>Loading...</i></li>
      )];
    }
    if (!counters.length) {
      return [(
        <li><i>Empty counters.</i></li>
      )];
    }
    return counters.map((counter: Counter) => {
      return (
        <li key={counter.id}>
          <i>{counter.id}&nbsp;)</i> {counter.name}: <b>{counter.value}</b>
        </li>
      );
    });
  }

}

function mapStateToProps(state: AppState): CountersListState {
  return {
    counters: state.counters
  };
}

function mapDispatchToProps(dispatch: Dispatch): ActionCreatorsMapObject {
  return bindActionCreators({
    inc: incCounterAction,
    dec: decCounterAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CountersList);
