import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

export interface DataTableType {
  key: string;
  routes: string;
  point1: string[];
  point2: string[];
  point3: string[];
}

interface Leg {
  steps: any[];
  summary: string;
  weight: number;
  duration: number;
  distance: number;
}

interface RouteCar {
  distance: number;
  duration: number;
  geometry: {
    coordinates: [number, number][];
    type: string;
  };
  legs: Leg[];
  weight: number,
  weight_name: string,
}

export interface RoutingState {
  routes: DataTableType[];
  selectedRoute: DataTableType | null;
  routeCar: RouteCar[] | null;
  loading: boolean;
  loadingError: any;
}

const initialState: RoutingState = {
  routes: [
    {
      key: '1',
      routes: 'Маршрут №1',
      point1: ['59.84660399', '30.29496392'],
      point2: ['59.82934196', '30.42423701'],
      point3: ['59.83567701', '30.38064206'],
    },
    {
      key: '2',
      routes: 'Маршрут №2',
      point1: ['59.82934196', '30.42423701'],
      point2: ['59.82761295', '30.41705607'],
      point3: ['59.84660399', '30.29496392'],
    },
    {
      key: '3',
      routes: 'Маршрут №3',
      point1: ['59.83567701', '30.38064206'],
      point2: ['59.84660399', '30.29496392'],
      point3: ['59.82761295', '30.41705607'],
    },
  ],
  selectedRoute: null,
  routeCar: null,
  loading: false,
  loadingError: null,
}

export const routingSlice = createSlice({
  name: 'routing',
  initialState,
  reducers: {
    selectRoute: (state, action: PayloadAction<DataTableType>) => {
      state.selectedRoute = action.payload
    },
    fetchRouteCar: (state) => {
      state.loading = true
      state.loadingError = null
    },
    fetchRouteCarSuccess: (state, action: PayloadAction<RouteCar[]>) => {
      state.routeCar = action.payload
    },
    fetchRouteCarFailed: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.loadingError = action.payload
    },
  }
})

export const {
  selectRoute,
  fetchRouteCarSuccess,
  fetchRouteCarFailed,
  fetchRouteCar,
} = routingSlice.actions

export const selectSelectedRoute = (state: RootState) => state.routing.selectedRoute
export const selectRoutes = (state: RootState) => state.routing.routes
export const selectRouteCar = (state: RootState) => state.routing.routeCar
export const selectRouteLoading = (state: RootState) => state.routing.loading
export const selectRouteLoadingError = (state: RootState) => state.routing.loadingError

export default routingSlice.reducer
