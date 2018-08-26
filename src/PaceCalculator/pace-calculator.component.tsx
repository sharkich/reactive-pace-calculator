import * as React from 'react';
import {AppState} from '../App/app.state';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Training} from '../Trainings/training.model';
import {PaceCalculatorActions, PaceCalculatorActionsTypeResult} from './pace-calculator.actions';

type State = Pick<AppState, 'activeTraining'>;

type Dispatcher = (training: Training) => PaceCalculatorActionsTypeResult;

interface Dispatchers {
  save: Dispatcher;
}

export class PaceCalculatorComponent extends React.Component {
  render(): JSX.Element {
    const activeTraining: Training = (this.props as State).activeTraining;
    if (!activeTraining) {
      return <div />;
    }
    return (
      <div>
        <h2>Pace Calculator</h2>
        <i>
          {activeTraining.id}
          &nbsp;)
        </i>{' '}
        <b>
          {activeTraining.pace}, {activeTraining.distance}, {activeTraining.time}
        </b>
        <i>{activeTraining.date}</i>
        <hr />
      </div>
    );
  }

  onSaveSubmit(): void {
    const activeTraining: Training = (this.props as State).activeTraining;
    (this.props as Dispatchers).save(activeTraining);
  }
}

function mapStateToProps(state: AppState): State {
  return {
    activeTraining: state.activeTraining
  };
}

function mapDispatchToProps(dispatch: Dispatch): ActionCreatorsMapObject {
  return bindActionCreators(
    {
      save: PaceCalculatorActions.save
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaceCalculatorComponent);
