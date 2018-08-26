import * as React from 'react';
import {AppState} from '../App/app.state';
import {Training} from './training.model';
import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import {TrainingsActions, TrainingsActionsResult} from './trainings.actions';

type State = Pick<AppState, 'trainings' | 'activeTraining'>;

type Dispatcher = (training: Training) => TrainingsActionsResult;

interface Dispatchers {
  select: Dispatcher;
}

class TrainingsComponent extends React.Component {

  render(): JSX.Element {

    return (
      <div>
        <h2>Trainings</h2>
        <ul>{this.renderList()}</ul>
      </div>
    );
  }

  renderList(): JSX.Element[] {
    const trainings: Training[] = (this.props as State).trainings;
    if (!trainings) {
      return [
        (
          <li key={0}>
            <i>Loading...</i>
          </li>
        )
      ];
    }
    if (!trainings.length) {
      return [
        (
          <li key={0}>
            <i>Empty trainings.</i>
          </li>
        )
      ];
    }
    return trainings.map((training: Training) => {
      return (
        <li onClick={() => this.onSelectClick(training)} key={training.id}>
          <i>
            {training.id}
            &nbsp;)
          </i>{' '}
          <b>{training.pace}, {training.distance}, {training.time}</b>
          <i>{training.date}</i>
        </li>
      );
    });
  }

  onSelectClick(training: Training): void {
    (this.props as Dispatchers).select(training);
  }

}

function mapStateToProps(state: AppState): State {
  return {
    trainings: state.trainings,
    activeTraining: state.activeTraining
  };
}

function mapDispatchToProps(dispatch: Dispatch): ActionCreatorsMapObject {
  return bindActionCreators(
    {
      select: TrainingsActions.select
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingsComponent);
