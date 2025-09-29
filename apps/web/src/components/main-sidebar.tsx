import {
  ScrollArea,
  Stack,
  Title,
  Card,
  Group,
  Indicator,
  Badge,
  NumberFormatter,
  Divider,
  Progress,
  Text,
} from '@mantine/core';
import { useMemo } from 'react';
import { District } from '../shared/lib/consts/districts';
import { riskColor } from '../shared/lib/utils/risk-color';

export function MainSidebar({ districts }: { districts: District[] }) {
  const totalLoss = useMemo(
    () => districts.reduce((s, d) => s + (d.lossesMln ?? 0), 0),
    [districts]
  );

  return (
    <ScrollArea style={{ height: 'calc(100vh - 64px)' }}>
      <Stack p="md" gap="md">
        <Title order={5}>Аналитика</Title>
        <Card withBorder>
          <Title order={6} mb="sm">
            Риски
          </Title>
          <Stack gap={6}>
            {districts.map((d) => (
              <Group key={d.id} justify="space-between">
                <Group>
                  <Indicator
                    color={riskColor(d.riskIndex)}
                    size={10}
                    processing
                  >
                    <Text>{d.name}</Text>
                  </Indicator>
                </Group>
                <Badge color={riskColor(d.riskIndex)} variant="light">
                  {d.riskIndex}
                </Badge>
              </Group>
            ))}
          </Stack>
        </Card>

        <Card withBorder>
          <Title order={6} mb="sm">
            Потери (суммарно)
          </Title>
          <Stack gap={6}>
            <Group justify="space-between">
              <Text>Москва</Text>
              <Text fw={600}>
                <NumberFormatter
                  value={totalLoss}
                  thousandSeparator
                  suffix=" млн ₽"
                />
              </Text>
            </Group>
            <Divider my="xs" />
            {districts.map((d) => (
              <Group key={d.id} justify="space-between">
                <Text>{d.name}</Text>
                <Text>
                  <NumberFormatter
                    value={d.lossesMln}
                    thousandSeparator
                    suffix=" млн ₽"
                  />
                </Text>
              </Group>
            ))}
          </Stack>
        </Card>

        <Card withBorder>
          <Title order={6} mb="sm">
            Прогноз (демо)
          </Title>
          <Progress value={62} title="62%" size="lg" striped animated />
        </Card>
      </Stack>
    </ScrollArea>
  );
}
