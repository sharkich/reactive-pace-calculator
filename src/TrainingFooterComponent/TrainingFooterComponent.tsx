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

    if (!this.isExistData(training, activeTraining)) {
      return this.emptyView(training);
    }

    return this.view(training);
  }

  private view(training: Training): JSX.Element {
    return (
      <div key={`additional-${training.id}`} className="training__additional">
        <div className="training__data__single">
          Speed: <span className="mark">10.00</span>{' '}
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

  private isExistData(training: Training | null, activeTraining: Training | null): boolean {
    return !!training && training === activeTraining;
  }
}
