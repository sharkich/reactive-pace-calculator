import * as React from 'react';
import {connect} from 'react-redux';

import {AppState} from '../App/app.state';
import {Counter} from './counter.model';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import {CountersActions, CountersActionsResult} from './counters.actions';

type State = Pick<AppState, 'counters' | 'activeCounter'>;

type CountersDispatcher = (counter: Counter) => CountersActionsResult;

interface Dispatchers {
  select: CountersDispatcher;
  increase: CountersDispatcher;
  decrease: CountersDispatcher;
}

class CountersListComponent extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <h2>Counters List</h2>
        {this.renderActiveCounter()}
        <ul>{this.renderCounter()}</ul>
      </div>
    );
  }

  renderActiveCounter(): JSX.Element {
    const counter: Counter = (this.props as State).activeCounter;
    if (!counter) {
      return (
        <div>
          <i>No selected counter.</i>
        </div>
      );
    }
    return (
      <div>
        <hr />
        <b>
          Active: {counter.name}: {counter.value}
        </b>
        <hr />
      </div>
    );
  }

  renderCounter(): JSX.Element[] {
    const counters: Counter[] = (this.props as State).counters;
    if (!counters) {
      return [
        (
          <li key={0}>
            <i>Loading...</i>
          </li>
        )
      ];
    }
    if (!counters.length) {
      return [
        (
          <li key={0}>
            <i>Empty counters.</i>
          </li>
        )
      ];
    }
    return counters.map((counter: Counter) => {
      return (
        <li onClick={() => this.onSelectCounterClick(counter)} key={counter.id}>
          <i>
            {counter.id}
            &nbsp;)
          </i>{' '}
          {counter.name}: <b>{counter.value}</b>
          &nbsp;
          <button onClick={() => this.onPlusCounterClick(counter)}>+</button>
          <button onClick={() => this.onMinusCounterClick(counter)}>&minus;</button>
        </li>
      );
    });
  }

  onSelectCounterClick(counter: Counter): void {
    (this.props as Dispatchers).select(counter);
  }

  onPlusCounterClick(counter: Counter): void {
    (this.props as Dispatchers).increase(counter);
  }

  onMinusCounterClick(counter: Counter): void {
    (this.props as Dispatchers).decrease(counter);
  }
}

function mapStateToProps(state: AppState): State {
  return {
    counters: state.counters,
    activeCounter: state.activeCounter
  };
}

function mapDispatchToProps(dispatch: Dispatch): ActionCreatorsMapObject {
  return bindActionCreators(
    {
      select: CountersActions.select,
      increase: CountersActions.increase,
      decrease: CountersActions.decrease
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountersListComponent);