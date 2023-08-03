import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import routingReducer from '../features/routing/routingSlice'
import createSagaMiddleware from 'redux-saga'
import {rootWatcher} from '../saga';

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    routing: routingReducer,
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootWatcher)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
