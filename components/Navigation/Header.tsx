import { ActionIcon, ColorScheme, Group, Header as MantineHeader } from '@mantine/core';
import { setCookies } from 'cookies-next';
import { AppProps } from 'next/app';
import { useState } from 'react';
import { MoonStars, Sun } from 'tabler-icons-react';
import DynamicBreadcrumbs from './DynamicBreadcrumbs';

export default function Header(props: AppProps & { colorScheme: ColorScheme }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <MantineHeader height={70} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Group>
          <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
            {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
          </ActionIcon>
          <DynamicBreadcrumbs />
        </Group>
      </div>
    </MantineHeader>
  );
}
