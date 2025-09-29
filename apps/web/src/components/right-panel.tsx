import { Stack } from '@mantine/core';
import { District } from '../shared/lib/consts/districts';
import { DistrictDetails } from './district-details';
import { RiskIndexCard } from './risk-index-card';

export function RightPanel({ selected }: { selected: District | null }) {
  return (
    <Stack
      p="md"
      gap="md"
      style={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}
    >
      <RiskIndexCard selected={selected} />
      <DistrictDetails selected={selected} />
    </Stack>
  );
}
