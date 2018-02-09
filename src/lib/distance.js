const getDistanceByLocs = (loc1, loc2) => getDistance(loc1.lat, loc1.lng, loc2.lat, loc2.lng);

const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371e3; // metres
  const rad1 = lat1 * Math.PI / 180;
  const rad2 = lat2 * Math.PI / 180;
  const latD = (lat2 - lat1) * Math.PI / 180;
  const lngD = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(latD / 2) * Math.sin(latD / 2) +
    Math.cos(rad1) * Math.cos(rad2) *
    Math.sin(lngD / 2) * Math.sin(lngD / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export { getDistance, getDistanceByLocs };
