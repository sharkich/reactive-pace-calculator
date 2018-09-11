import * as React from 'react';
import {Atom} from '@grammarly/focal';
// tslint:disable-next-line
import './FormRowComponent.css';

import {Training} from 'src/_shared/models';
import {AppEvent} from 'src/_shared/AppEvent';
import {TrainingFields} from 'src/_shared/types/TrainingFieldsType';
import {CalculateTrainingService} from 'src/_shared/CalculateTrainingService';

export interface Props {
  training: Training;
  label: string;
  field: TrainingFields;
  isNumber?: boolean;
  action: string;
  value?: string;
  isCalculable?: boolean;
  eventAtom: Atom<AppEvent>;
}

export class FormRowComponent extends React.Component<Props> {
  eventAtom: Atom<AppEvent>;
  field: string;
  training: Training;
  isNumberValidation: boolean;
  action: string;

  constructor(data: any) {
    super(data);

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onCalculateClick = this.onCalculateClick.bind(this);
  }

  render(): JSX.Element {
    const props: Props = this.props as Props;

    this.eventAtom = props.eventAtom;
    this.isNumberValidation = !!props.isNumber;
    this.action = props.action;
    this.field = props.field;

    this.training = props.training;

    const calculate: JSX.Element = props.isCalculable ? (
      <button onClick={this.onCalculateClick}>calculate</button>
    ) : (
      <div />
    );

    return (
      <div className="training-form-row">
        <div className="col-1">
          <label htmlFor={`field-${this.field}-${this.training.id}`}>{props.label}</label>
        </div>
        <div className="col--2">
          <input
            type="text"
            id={`field-${this.field}-${this.training.id}`}
            defaultValue={props.value || '' + this.training[this.field]}
            onKeyUp={this.onKeyUp}
          />
        </div>
        <div className="col--3">{calculate}</div>
      </div>
    );
  }

  private onKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (this.isNumberValidation && !this.isValidNumberKey(event.key)) {
      event.stopPropagation();
      return;
    }
    if (!this.isValidStringKey(event.key)) {
      event.stopPropagation();
      return;
    }
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.eventAtom.set(new AppEvent(this.action, inputElement.value));
  }

  private isValidNumberKey(key: string): boolean {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(+key) !== -1;
  }

  private isValidStringKey(key: string): boolean {
    return ['Enter', 'Escape'].indexOf(key) === -1;
  }

  private onCalculateClick(): void {
    this.eventAtom.set(new AppEvent(CalculateTrainingService.ACTION_CALCULATE_TRAINING_FIELD, {
      field: this.field,
      training: this.training
    }));
  }
}
