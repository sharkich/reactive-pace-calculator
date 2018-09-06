import * as React from 'react';
import {Atom} from '@grammarly/focal';
// tslint:disable-next-line
import './FormRowComponent.css';

import {Training} from 'src/_shared/models';
import {AppEvent} from 'src/_shared/AppEvent';

export interface Props {
  training: Training;
  label: string;
  field: keyof Training;
  isNumber?: boolean;
  action: string;
  value?: string;
  eventAtom: Atom<AppEvent>;
}

export class FormRowComponent extends React.Component<Props> {

  eventAtom: Atom<AppEvent>;
  isNumberValidation: boolean;
  action: string;

  constructor(data: any) {
    super(data);

    this.onKeyUp = this.onKeyUp.bind(this);
  }

  render(): JSX.Element {
    const props: Props = this.props as Props;

    this.eventAtom = props.eventAtom;
    this.isNumberValidation = !!props.isNumber;
    this.action = props.action;

    const training: Training = props.training;

    return (
      <div className="training-form-row">
        <div className="col-1">
          <label htmlFor={`field-${props.field}-${training.id}`}>{props.label}</label>
        </div>
        <div className="col--2">
          <input
            type="text"
            id={`field-${props.field}-${training.id}`}
            defaultValue={props.value || '' + training[props.field]}
            onKeyUp={this.onKeyUp}
          />
        </div>
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

}
