import * as React from 'react';
// tslint:disable-next-line
import './TrainingFooterComponent.css';

import {Training} from '../_shared/models';

export interface Props {
  training: Training;
  activeTraining: Training | null;
}

export class TrainingFooterComponent extends React.Component {
  render(): JSX.Element {
    const props: Props = this.props as Props;
    const training: Training = props.training;
    const activeTraining: Training | null = props.activeTraining;

    if (training && training.theSame(activeTraining)) {
      return this.view(training);
    }

    return this.emptyView(training);
  }

  private view(training: Training): JSX.Element {
    return (
      <div key={`additional-${training.id}`} className="training__additional">
        <div className="training__data__single">

          Name: <span className="mark">{training.name}</span>{' '},
          Distance: <span className="mark">{training.distance}</span>{' '},
          Pace: <span className="mark">{training.pace}</span>{' '},
          Time: <span className="mark">{training.time}</span>{' '},

          Speed:{' '}
          <span className="mark">x</span>{' '}
          <span className="training__data__additional">km/h</span>,
        </div>
        <div>
          <span className="grey"> ID: {training.id}</span>
        </div>
      </div>
    );
  }

  private emptyView(training: Training): JSX.Element {
    return <div key={`additional-${training.id}`} />;
  }
}
