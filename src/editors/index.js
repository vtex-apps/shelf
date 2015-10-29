import { actions } from 'sdk';
import ShelfEditor from './ShelfEditor/ShelfEditor';

let components = [
  {
    name: 'ShelfEditor@vtex.storefront-shelf',
    constructor: ShelfEditor
  }
];

actions.ComponentActions.register(components);
