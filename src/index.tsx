import { render } from 'solid-js/web';

import { Game } from './components/Game';

import './index.scss';

render(() => <Game />, document.getElementById('root') as HTMLElement);
