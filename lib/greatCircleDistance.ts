function degToRad(deg: number) {
  return deg * (Math.PI / 180);
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export function computeGreatCircleDistance(
  posA: Coordinates,
  posB: Coordinates,
) {
  const earthRadiusKm = 6371;

  const longitudeA = degToRad(posA.longitude);
  const latitudeA = degToRad(posA.latitude);
  const longitudeB = degToRad(posB.longitude);
  const latitudeB = degToRad(posB.latitude);

  const diffLat = latitudeA - latitudeB;
  const diffLong = longitudeA - longitudeB;
  const a =
    Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
    Math.cos(latitudeA) *
      Math.cos(latitudeB) *
      Math.sin(diffLong / 2) *
      Math.sin(diffLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}
