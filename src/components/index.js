import { actions } from 'sdk';
import Shelf from './Shelf/Shelf';

let components = [
  {
    name: 'Shelf@vtex.storefront-shelf',
    constructor: Shelf,
  }
];

actions.ComponentActions.register(components);
