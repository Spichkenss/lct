import { Box } from '@mantine/core';
import { useRef, useEffect, useState } from 'react';
import { District } from '../shared/lib/consts/districts';
import { load } from '@2gis/mapgl';

export function Map2GIS({
  districts,
  selectedId,
  onSelect,
  onHover,
}: {
  districts: District[];
  selectedId?: string | null;
  onSelect: (id: string | null) => void;
  onHover?: (id: string | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>();
  const [mapgl, setMapgl] = useState<any>();

  const objectsRef = useRef<any[]>([]);

  // замыкаем кольца
  const ensureClosed = (rings: [number, number][][]) =>
    rings.map((ring) => {
      const a = ring[0],
        b = ring[ring.length - 1];
      return b && a && a[0] === b[0] && a[1] === b[1] ? ring : [...ring, a];
    });

  useEffect(() => {
    let cleanup = () => {
      /* empty */
    };

    async function init() {
      const mapgl = await load();
      setMapgl(mapgl);

      const map = new mapgl.Map(containerRef.current!, {
        center: [37.6173, 55.7558],
        zoom: 10.1,
        key: import.meta.env.VITE_2GIS_API_KEY,
      });
      setMap(map);

      const created: any[] = [];
      districts.forEach((d) => {
        const groups: [number, number][][][] = Array.isArray(d.polygons[0][0])
          ? (d.polygons as any)
          : [d.polygons as any];

        groups.forEach((rings) => {
          const polygon = new mapgl.Polygon(map, {
            coordinates: ensureClosed(rings),
            color: d.id === selectedId ? '#ff7878' : '#ffc800',
            strokeColor: d.id === selectedId ? '#ff5050' : '#ffaa00',
            strokeWidth: d.id === selectedId ? 3 : 2,
            interactive: true,
            zIndex: 1000,
          });

          // Диагностика + прод
          polygon.on('click', () => {
            onSelect(d.id);
          });
          polygon.on('mouseover', () => {
            onHover?.(d.id);
            console.log('hovered');
          });
          polygon.on('mouseout', () => onHover?.(null));
          polygon.on('mousemove', () => {
            /* console.log('move over', d.id); */
          });

          created.push(polygon);
        });
      });

      objectsRef.current = created;

      cleanup = () => {
        created.forEach((o) => o?.destroy?.());
        map?.destroy?.();
      };
    }

    init();
    return () => cleanup();
  }, [districts, onHover, onSelect, selectedId]);

  // Перерисовка при смене selectedId/данных
  useEffect(() => {
    if (!map || !mapgl) return;

    objectsRef.current.forEach((o) => o?.destroy?.());
    objectsRef.current = [];

    const created: any[] = [];

    districts.forEach((d) => {
      const groups: [number, number][][][] = Array.isArray(d.polygons[0][0])
        ? (d.polygons as any)
        : [d.polygons as any];

      groups.forEach((rings) => {
        const polygon = new mapgl.Polygon(map, {
          coordinates: ensureClosed(rings),
          color: d.id === selectedId ? '#ff78787f' : '#ffc80059',
          strokeColor: d.id === selectedId ? '#ff5050ff' : '#ffaa00ff',
          strokeWidth: d.id === selectedId ? 3 : 2,
          interactive: true,
          zIndex: 10,
        });

        polygon.on('click', () => onSelect(d.id));
        polygon.on('mouseover', () => onHover?.(d.id));
        polygon.on('mouseout', () => onHover?.(null));

        created.push(polygon);
      });
    });

    objectsRef.current = created;
  }, [districts, selectedId, onSelect, onHover, map, mapgl]);

  return (
    <Box
      ref={containerRef}
      style={{
        width: '100%',
        height: 520,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    />
  );
}
