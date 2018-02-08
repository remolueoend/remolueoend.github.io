import { path } from 'ramda'

export const translations = {
  aces: '1',
  twos: '2',
  threes: '3',
  fours: '4',
  fives: '5',
  sixes: '6',
}

export default key => path(key.split('.'), translations) || key
