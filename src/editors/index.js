import { actions } from 'sdk';
import ShelfEditor from './ShelfEditor';

let components = [
  {
    name: 'ShelfEditor@vtex.shelf',
    constructor: ShelfEditor
  }
];

actions.ComponentActions.register(components);
