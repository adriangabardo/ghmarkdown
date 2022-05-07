import { Group, Header as MantineHeader } from '@mantine/core';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import DynamicBreadcrumbs from './DynamicBreadcrumbs';

export default function Header() {
  return (
    <MantineHeader height={70} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Group>
          <ColorSchemeToggle />
          <DynamicBreadcrumbs />
        </Group>
      </div>
    </MantineHeader>
  );
}
