import * as React from 'react';
import {AppState} from '../App/app.state';
import {Training} from './training.model';
import {connect} from 'react-redux';

type State = Pick<AppState, 'trainings'>;

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
    console.log('onSelect', training);
  }

}

function mapStateToProps(state: AppState): State {
  return {
    trainings: state.trainings
  };
}

export default connect(
  mapStateToProps,
  null
)(TrainingsComponent);
