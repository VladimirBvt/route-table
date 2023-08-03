import {all} from 'redux-saga/effects'
import {routingWatcher} from './routingSaga';

export function* rootWatcher() {
  yield all([
    routingWatcher(),
  ])
}
