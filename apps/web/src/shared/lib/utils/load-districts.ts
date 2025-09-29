import { District } from '../consts/districts';

export async function loadDistrictsFromGeoJSON(
  url: string
): Promise<District[]> {
  const res = await fetch(url);
  const geo = await res.json();
  const features: any[] = geo.features || [];
  return features.map((f, idx) => {
    const id =
      f.properties?.id ||
      f.properties?.AO ||
      f.properties?.adm_okrug ||
      String(idx);
    const name =
      f.properties?.name ||
      f.properties?.NAME ||
      f.properties?.ao_name ||
      f.properties?.adm_okrug ||
      `Округ ${idx + 1}`;
    const geomType = f.geometry?.type;
    let polygons: any = [];
    if (geomType === 'Polygon') polygons = f.geometry.coordinates;
    else if (geomType === 'MultiPolygon') polygons = f.geometry.coordinates;
    return {
      id,
      name,
      polygons,
      riskIndex: 50 + ((idx * 13) % 40),
      lossesMln: 30 + ((idx * 7) % 90),
    } as District;
  });
}
