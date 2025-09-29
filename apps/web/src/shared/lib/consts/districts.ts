export type District = {
  id: string;
  name: string;
  riskIndex: number; // mock metric 0-100
  lossesMln: number; // mock
  polygons: [number, number][][]; // array of rings per polygon (outer + holes if есть)
  centroid?: [number, number];
};
