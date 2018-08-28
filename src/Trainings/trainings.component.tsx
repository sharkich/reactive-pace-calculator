import * as React from 'react';

import {Training, Trainings} from './training.model';

export class TrainingsComponent extends React.Component<any, any> {

  render(): JSX.Element {
    return (
      <div>
        <h2>Trainings</h2>
        <ul>{this.renderList()}</ul>
      </div>
    );
  }

  renderList(): JSX.Element[] {
    const trainings: Trainings | null = null;
    if (!trainings) {
      return [<li key={0}><i>Loading...</i></li>];
    }
    if (!Object.keys(trainings).length) {
      return [<li key={0}><i>Empty trainings.</i></li>];
    }
    return Object.keys(trainings).map((id: string) => {
      const training: Training = trainings[id];
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
    const activeTraining: Training | null = null; // (this.props as State).activeTraining;
    if (activeTraining === training) {
      return;
    }
    console.log('onSelectClick');
  }

  private isSelected(training: Training): boolean {
    const activeTraining: Training | null = null; // (this.props as State).activeTraining;
    return activeTraining === training;
  }
}
