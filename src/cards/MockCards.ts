
import { GameCardContent } from './GameCardContent';
import { colors } from '@mui/material';

export const CARDS = [
  new GameCardContent({
    id: 1,
    name: 0x1F435,
    color: colors.blue[500],
  }),
  new GameCardContent({
    id: 2,
    name: 0x1F436,
    color: colors.red[500],
  }),
  new GameCardContent({
    id: 3,
    name: 0x1F431,
    color: colors.green[500],
  }),
  new GameCardContent({
    id: 4,
    name: 0x1F98C,
    color: colors.yellow[500],
  }),
  new GameCardContent({
    id: 5,
    name: 0x1F42E,
    color: colors.purple[500],
  }),
  new GameCardContent({
    id: 5,
    name: 0x1F439	,
    color: colors.pink[500],
  })
];
