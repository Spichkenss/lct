import {
  AppShell,
  Group,
  Burger,
  ThemeIcon,
  Stack,
  Loader,
  Alert,
  Grid,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChartBar } from '@tabler/icons-react';
import { useState, useEffect, useMemo } from 'react';
import { CenterPanel } from '../components/center-panel';
import { RightPanel } from '../components/right-panel';
import { District } from '../shared/lib/consts/districts';
import { loadDistrictsFromGeoJSON } from '../shared/lib/utils/load-districts';
import { MainSidebar } from '../components/main-sidebar';

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [districts, setDistricts] = useState<District[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Положите файл в public/geo/moscow_ao.geojson
    loadDistrictsFromGeoJSON('/geo/moscow_ao.geojson')
      .then((res) => {
        setDistricts(res);
      })
      .catch((e) => {
        setError(String(e));
      });
  }, []);

  const selected = useMemo(
    () => (districts || []).find((d) => d.id === selectedId) ?? null,
    [districts, selectedId]
  );

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{ width: 320, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group gap={8}>
            <ThemeIcon variant="light">
              <IconChartBar />
            </ThemeIcon>
            <Text fw={700}>КОД ZY — Карта рисков и потерь (Москва)</Text>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="0">
        {districts ? (
          <MainSidebar districts={districts} />
        ) : (
          <Stack p="md">
            {!error ? (
              <Group>
                <Loader size="sm" />
                <Text>Загрузка округов…</Text>
              </Group>
            ) : (
              <Alert color="red" title="Не удалось загрузить GeoJSON">
                {error}
              </Alert>
            )}
          </Stack>
        )}
      </AppShell.Navbar>

      <AppShell.Main>
        {districts ? (
          <Grid>
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <CenterPanel
                districts={districts}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <RightPanel selected={selected} />
            </Grid.Col>
          </Grid>
        ) : (
          <Stack align="center" justify="center" h="60vh">
            {!error ? (
              <Loader />
            ) : (
              <Alert color="red" title="Ошибка загрузки">
                {error}
              </Alert>
            )}
          </Stack>
        )}
      </AppShell.Main>
    </AppShell>
  );
}
