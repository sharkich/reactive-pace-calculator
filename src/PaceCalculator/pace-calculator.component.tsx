import * as React from 'react';
import {Atom, F} from '@grammarly/focal';

// @ts-ignore
// import {AppState} from '../App/App.state';
import {Training} from '../Trainings/training.model';

export function PaceCalculatorComponent(props: { state: Atom<Training | null> }): JSX.Element {
  return (
    <F.div>
      ID: [{props.state.view((x: Training | null) => x && x.id)}]
    </F.div>
  );
}

// export class PaceCalculatorComponent extends React.Component<any, any> {
//
//   render(): JSX.Element {
//     // const appState: AppState = this.props.state;
//     // const activeTraining: Training = this.props.training;
//     if (!this.props.state) {
//       console.log('1');
//       return <div>Loading...</div>;
//     }
//     console.log('2', this.props.state);
//     return (
//       <F.div>
//         <h2>Pace Calculator</h2>
//         <i>
//           {this.props.state ? this.props.state.id : 'nono'}
//           &nbsp;)
//           [{this.props.state.view((x: Training) => x && x.id)}]
//         </i>{' '}
//         {/*<b>*/}
//           {/*{appState.view((t: AppState) => t.activeTraining.pace)},*/}
//           {/*{appState.view((t: AppState) => t.activeTraining.distance)},*/}
//           {/*{appState.view((t: Training) => t.activeTraining.time)}*/}
//         {/*</b>*/}
//         {/*<i>{appState.view((t: AppState) => t.activeTraining.date)}</i>*/}
//         <hr />
//       </F.div>
//     );
//   }
//
//   // onSaveSubmit(): void {
//   //   const activeTraining: Training | null = (this.props as State).activeTraining;
//   //   console.log('save', activeTraining);
//   // }
// }
