import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Polyline, Popup, TileLayer, useMap} from 'react-leaflet'
import styles from './Map.module.scss'
import {selectRouteCar, selectSelectedRoute} from "../../features/routing/routingSlice";
import {useAppSelector} from "../../app/hooks";

const Map = () => {

  const [route, setRoute] = useState<[number, number][]>([])
  const [points, setPoints] = useState<[number, number][]>([])

  const selectedRoute = useAppSelector(selectSelectedRoute)
  const routeCar = useAppSelector(selectRouteCar)

  // const center: [number, number] = [51.505, -0.09]
  const center: [number, number] = [59.983762, 30.311365]

  const polyline: [number, number][] = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ]

  const limeOptions = {color: 'lime'}

  useEffect(() => {
    const pointsCoordinates: [number, number][] = routeCar !== null ? routeCar[0].geometry.coordinates : []
    setRoute(pointsCoordinates)

    const initialPointsSelectedRoute = selectedRoute !== null ?
      [
        selectedRoute.point1.map(item => Number(item)),
        selectedRoute.point2.map(item => Number(item)),
        selectedRoute.point3.map(item => Number(item))
      ] : []
    // @ts-ignore
    setPoints(initialPointsSelectedRoute)
  }, [selectedRoute])

  useEffect(() => {
    console.log(route)
    }, [route])

  return (
    <div>
      <h2>Карта</h2>
      {/*// @ts-ignore*/}
      <MapContainer center={center} zoom={9} scrollWheelZoom={false} className={styles.mapContainer} attributionControl={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                   url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {/*{polyline.map((coordinateItem, index) => {*/}
        {points && points.map((coordinateItem, index) => {
            return (
            <Marker position={coordinateItem} key={index}>
              <Popup>
                <b>{`Point ${index + 1}: `}</b>
                {String(coordinateItem)}
              </Popup>
            </Marker>
          )
        })}
        <Polyline pathOptions={limeOptions} positions={route}/>
      </MapContainer>

    </div>
  );
};

export default Map;
