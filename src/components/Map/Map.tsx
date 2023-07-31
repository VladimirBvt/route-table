import React, {useEffect} from 'react';
import {MapContainer, Marker, Polyline, Popup, TileLayer, useMap} from 'react-leaflet'
import styles from './Map.module.scss'
import {selectSelectedRoute} from "../../features/routing/routingSlice";
import {useAppSelector} from "../../app/hooks";
import {log} from "util";

const Map = () => {

  const selectedRoute = useAppSelector(selectSelectedRoute)

  const center: [number, number] = [51.505, -0.09]

  const polyline: [number, number][] = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ]

  // const polyline = [
  //   ['51.505', '-0.09'],
  //   ['51.51', '-0.1'],
  //   ['51.51', '-0.12'],
  // ]

  const limeOptions = { color: 'lime' }

  console.log(selectedRoute)

  useEffect(() => {
    // const BASE_URL = 'http://router.project-osrm.org'
    const points = polyline.map(item => `${item[0]},${item[1]}`).join(';')

    // const response = fetch(`${BASE_URL}/route/v1/driving/${points}?overview=simplified`)
    fetch(`http://router.project-osrm.org/route/v1/driving/${points}?overview=simplified`)
      .then(res => console.log(res.json()))

    // console.log(response)
      }, [])

  return (
    <div>
      <h2>Карта</h2>

      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className={styles.mapContainer}>
      {/*<MapContainer center={[55.7422, 37.5719]} zoom={11} scrollWheelZoom={false} className={styles.mapContainer}>*/}
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                   url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {polyline.map((coordinateItem, index) => {
          return (
            <Marker position={coordinateItem} key={index}>
              <Popup>
                <b>{`Point ${index + 1}: `}</b>
                {String(coordinateItem)}
              </Popup>
            </Marker>
          )
        })}
        {/*<Marker position={[51.505, -0.09]}>*/}
        {/*  <Popup>*/}
        {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
        {/*  </Popup>*/}
        {/*</Marker>*/}

        <Polyline pathOptions={limeOptions} positions={polyline} />
      </MapContainer>

    </div>
  );
};

export default Map;
