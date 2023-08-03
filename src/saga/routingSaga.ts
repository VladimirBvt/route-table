import {select, takeLatest, call, put} from 'redux-saga/effects'
import {fetchRouteCarFailed, fetchRouteCarSuccess, selectSelectedRoute} from '../features/routing/routingSlice';
import {selectRoute} from '../features/routing/routingSlice'
import getRouteCar from '../api/api';

function* fetchRouteCarWorker() {
  try {
    // @ts-ignore
    const selectedRoute = yield select(selectSelectedRoute)

    const polyline: [number, number][] = [
      selectedRoute.point1,
      selectedRoute.point2,
      selectedRoute.point3,
    ]

    const points = polyline.map(item => `${item[0]},${item[1]}`).join(';')
    // @ts-ignore
    const response = yield call(getRouteCar, points)

    yield put(fetchRouteCarSuccess(response.routes))

  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchRouteCarFailed(error))
    }
  }
}

export function* routingWatcher() {
  yield takeLatest(selectRoute.type, fetchRouteCarWorker)
}
