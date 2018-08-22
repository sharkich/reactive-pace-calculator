import * as React from 'react';

interface ListViewProps {
  title?: string;
}

export class ListView extends React.Component<ListViewProps, {}> {
  render(): JSX.Element {
    const { title, children } = this.props;

    return (
      <div>
        {title && <h2>{title}</h2>}
        <div>{children}</div>
      </div>
    );
  }
}
