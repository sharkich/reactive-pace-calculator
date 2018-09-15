import * as React from 'react';
import {Atom, F} from '@grammarly/focal';
// tslint:disable-next-line
import './FormRowComponent.css';

import {Training} from 'src/_shared/models';
import {AppEvent} from 'src/_shared/AppEvent';
import {TrainingFields} from 'src/_shared/types/TrainingFieldsType';
import {CalculateTrainingService} from 'src/_shared/services/CalculateTrainingService';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

export interface Props {
  trainingAtom: Atom<Training>;
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
  trainingAtom: Atom<Training>;
  field: string;
  isNumberValidation: boolean;
  action: string;

  value: string = '';
  isEdited: boolean = false;

  constructor(data: any) {
    super(data);

    this.onChange = this.onChange.bind(this);
  }

  render(): JSX.Element {
    const props: Props = this.props as Props;

    this.eventAtom = props.eventAtom;
    this.eventAtom.subscribe(({event, payload}: AppEvent) => {
      switch (event) {
        case CalculateTrainingService.ACTION_CALCULATE_TRAINING_FIELD:
          this.calculateField(payload as {field: TrainingFields; training: Training});
          break;
      }
    });

    this.isNumberValidation = !!props.isNumber;
    this.action = props.action;
    this.field = props.field;

    this.trainingAtom = props.trainingAtom;
    const trainingAtom: Atom<Training> = props.trainingAtom;
    const observable: Observable<JSX.Element> = trainingAtom.pipe(
      map((training: Training) => this.view(training))
    );

    return <F.div>{observable}</F.div>;
  }

  private view(training: Training): JSX.Element {
    if (!this.isEdited) {
      this.value = '' + (this.props.value || training[this.field] || '');
    }

    const calculate: JSX.Element = this.props.isCalculable ? (
      <button onClick={(event: React.MouseEvent) => this.onCalculateClick(event, training)}>
        calculate
      </button>
    ) : (
      <div />
    );

    const validateClassName: string =
      this.props.isCalculable && !training.valid ? 'invalid' : 'valid';

    return (
      <F.div className="training-form-row">
        <div className="col-1">
          <label htmlFor={`field-${this.field}-${training.id}`}>{this.props.label}</label>
        </div>
        <div className="col--2">
          <input
            className={validateClassName}
            type="text"
            id={`field-${this.field}-${training.id}`}
            onChange={this.onChange}
            value={this.value}
          />
        </div>
        <div className="col--3">{calculate}</div>
      </F.div>
    );
  }

  private onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const inputElement: HTMLInputElement = event.target as HTMLInputElement;
    this.edit(inputElement.value);
  }

  private edit(value: string): void {
    if (value !== this.value) {
      this.isEdited = true;
      this.eventAtom.set(new AppEvent(this.action, value));
    }
    this.value = value;
  }

  private onCalculateClick(event: React.MouseEvent, training: Training): void {
    event.stopPropagation();
    this.eventAtom.set(
      new AppEvent(CalculateTrainingService.ACTION_CALCULATE_TRAINING_FIELD, {
        field: this.field,
        training: training
      })
    );
  }

  private calculateField({field}: {field: TrainingFields; training: Training}): void {
    if (field === this.field) {
      this.isEdited = false;
    }
  }
}
