// Converts a given value in degrees to radians
function toRad(value: number) {
  return (value * Math.PI) / 180;
}

// Calculates the distance between two geographical points (lat1, lng1) and (lat2, lng2) using the Haversine formula
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const R = 6371; // Radius of the Earth in kilometers

  // Convert the latitudes and longitudes from degrees to radians
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const l1 = toRad(lat1);
  const l2 = toRad(lat2);

  /*
   * Haversine formula:
   * a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
   * c = 2 ⋅ atan2( √a, √(1−a) )
   * d = R ⋅ c
   * where φ is latitude, λ is longitude, R is Earth’s radius (mean radius = 6,371km)
   * The formula calculates the shortest distance over the earth's surface.
   */
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const d = R * c;
  return d;
}

export function findNearestPlace(
  places: { name: string; lat: number; lon: number }[],
  lat: number,
  lon: number
) {
  const sortedPlaces = [...places];

  // Sort the places by distance using the calculateDistance function
  sortedPlaces.sort((a, b) => {
    const distanceA = calculateDistance(lat, lon, a.lat, a.lon);
    const distanceB = calculateDistance(lat, lon, b.lat, b.lon);
    return distanceA - distanceB;
  });

  // Return the first place in the sorted array (the nearest place)
  return sortedPlaces[0];
}
