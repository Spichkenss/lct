export function featureToPolygons(feature: any): [number, number][][] {
  const { type, coordinates } = feature.geometry || {};
  if (type === 'Polygon') {
    return coordinates as [number, number][][]; // [ring][coord]
  }
  if (type === 'MultiPolygon') {
    return coordinates as any;
  }
  return [] as any;
}
