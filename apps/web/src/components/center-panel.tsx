import { Stack, Card, Group, ThemeIcon, Title, Badge } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import { District } from '../shared/lib/consts/districts';
import { Map2GIS } from './main-map';

export function CenterPanel({
  districts,
  selectedId,
  setSelectedId,
}: {
  districts: District[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}) {
  return (
    <Stack p="md" gap="md">
      <Card withBorder>
        <Group mb="sm">
          <ThemeIcon variant="light">
            <IconMapPin />
          </ThemeIcon>
          <Title order={5}>Карта рисков и потерь (Москва)</Title>
        </Group>
        <Map2GIS
          districts={districts}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onHover={() => {
            console.log(123);
          }}
        />
        <Group justify="apart" mt="xs">
          <Badge color="green" variant="light">
            низкий риск
          </Badge>
          <Badge color="yellow" variant="light">
            средний
          </Badge>
          <Badge color="red" variant="light">
            высокий
          </Badge>
        </Group>
      </Card>
    </Stack>
  );
}
