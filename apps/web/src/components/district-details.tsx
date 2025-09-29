import {
  Paper,
  Card,
  Title,
  Table,
  Badge,
  NumberFormatter,
  Text,
} from '@mantine/core';
import { District } from '../shared/lib/consts/districts';
import { riskColor } from '../shared/lib/utils/risk-color';

export function DistrictDetails({ selected }: { selected: District | null }) {
  if (!selected) {
    return (
      <Paper withBorder p="md">
        <Text c="dimmed">
          Округ не выбран. Выберите округ на карте, чтобы увидеть подробную
          информацию.
        </Text>
      </Paper>
    );
  }

  return (
    <Card withBorder>
      <Title order={6} mb="sm">
        {selected.name}: подробная информация
      </Title>
      <Table verticalSpacing="xs">
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>Индекс риска</Table.Td>
            <Table.Td>
              <Badge color={riskColor(selected.riskIndex)}>
                {selected.riskIndex}
              </Badge>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>Потери</Table.Td>
            <Table.Td>
              <NumberFormatter
                value={selected.lossesMln}
                thousandSeparator
                suffix=" млн ₽"
              />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Card>
  );
}
