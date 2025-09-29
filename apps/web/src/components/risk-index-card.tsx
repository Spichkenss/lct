import { Card, Group, ThemeIcon, Title, Badge, Text } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { District } from '../shared/lib/consts/districts';
import { riskColor } from '../shared/lib/utils/risk-color';

export function RiskIndexCard({ selected }: { selected: District | null }) {
  return (
    <Card withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ThemeIcon variant="light" size="lg">
            <IconAlertTriangle />
          </ThemeIcon>
          <div>
            <Text size="sm" c="dimmed">
              Метрика
            </Text>
            <Title order={5}>Индекс риска</Title>
          </div>
        </Group>
        <Badge
          size="lg"
          color={selected ? riskColor(selected.riskIndex) : 'gray'}
        >
          {selected ? selected.riskIndex : '—'}
        </Badge>
      </Group>
      <Text c="dimmed" size="sm">
        Кликните по округу на карте, чтобы увидеть подробности ниже.
      </Text>
    </Card>
  );
}
