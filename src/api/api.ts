const getRouteCar = (routePointsPolyline: [number, number][]) => {

  return fetch(
    `http://router.project-osrm.org/route/v1/driving/${routePointsPolyline}?steps=true&geometries=geojson&overview=full`
  ).then((response) => response.json())
}

export default getRouteCar
