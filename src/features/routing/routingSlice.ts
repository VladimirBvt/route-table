import {DataType} from "../../components/TableRoutes/TableRoutes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";


export interface RoutingState {
  routes: DataType[];
  selectedRoute: DataType | null;
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
}

export const routingSlice = createSlice({
  name: 'routing',
  initialState,
  reducers: {
    selectRoute: (state, action: PayloadAction<DataType>) => {
      state.selectedRoute = action.payload
    }
  }
})

export const {selectRoute} = routingSlice.actions

export const selectSelectedRoute = (state: RootState) => state.routing.selectedRoute
export const selectRoutes = (state: RootState) => state.routing.routes

export default routingSlice.reducer
