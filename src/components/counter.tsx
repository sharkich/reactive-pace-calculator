import * as React from 'react';
import {FunctionVoid} from '../interfaces/functions.interfaces';

// tslint:disable-next-line
interface Props {
}

interface State {
  count: number;
}

export class Counter extends React.Component<Props, State> {
  interval: number;
  state: State = { count: 0 };

  componentWillMount(): void {
    const incrementCounter: FunctionVoid = () => {
      this.setState({ count: this.state.count + 1 });
    };
    this.interval = setInterval(incrementCounter, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  render(): JSX.Element {
    return (
      <div>
        <div>Counter: {this.state.count}</div>
      </div>
    );
  }
}

export default Counter;
