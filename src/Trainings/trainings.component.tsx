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
    let error: JSX.Element | null = null;
    if (!trainings) {
      error = <i>Loading...</i>;
    }
    if (!trainings.length) {
      error = <i>Empty trainings.</i>;
    }
    if (error) {
      return [<li key={0}>{error}</li>];
    }
    return trainings.map((training: Training) => {
      const selected: JSX.Element = this.isSelected(training) ? <b> [Selected]</b> : <i />;
      return (
        <li onClick={() => this.onSelectClick(training)} key={training.id}>
          <i>
            {training.id}
            &nbsp;)
          </i>{' '}
          <b>
            {training.pace}, {training.distance}, {training.time}
          </b>
          <i>{training.date}</i>
          {selected}
        </li>
      );
    });
  }

  onSelectClick(training: Training): void {
    const activeTraining: Training = (this.props as State).activeTraining;
    if (activeTraining === training) {
      return;
    }
    (this.props as Dispatchers).select(training);
  }

  private isSelected(training: Training): boolean {
    const activeTraining: Training = (this.props as State).activeTraining;
    return activeTraining === training;
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
