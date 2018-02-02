import { h, render } from 'preact';
import App from './containers/app';

let mountNode = document.getElementById('root') as Element;
mountNode = render(<App />, mountNode, mountNode.lastElementChild || undefined);

if (process.env.NODE_ENV !== 'production') {
  require('preact/debug');
}
