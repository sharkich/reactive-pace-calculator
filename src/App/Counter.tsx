import * as React from 'react';
import {Atom, F} from '@grammarly/focal';

export function Counter(props: { count: Atom<number> }): JSX.Element {
  return (
    <F.div>
      Count: {props.count}.
      That's an {props.count.view((x: number) => x % 2 === 0 ? 'even' : 'odd')} number!
    </F.div>
  );
}
