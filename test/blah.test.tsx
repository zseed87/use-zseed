import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HelloWord } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HelloWord />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
