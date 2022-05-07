import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Navbar,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import React from 'react';
import { ChevronLeft, ChevronRight, MoonStars, Sun } from 'tabler-icons-react';

export default function Navigation() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Navbar height={600} p="xs" width={{ base: 300 }}>
      <Navbar.Section mt="xs">
        <Box
          sx={{
            paddingLeft: theme.spacing.xs,
            paddingRight: theme.spacing.xs,
            paddingBottom: theme.spacing.lg,
            borderBottom: `1px solid ${
              theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
          }}
        >
          <Group position="apart">
            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
              {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
            </ActionIcon>
          </Group>
        </Box>
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        <UnstyledButton
          sx={{
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            },
          }}
        >
          <Group>
            <Text size="sm">Some text</Text>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
      <Navbar.Section>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
            borderTop: `1px solid ${
              theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
          }}
        >
          <UnstyledButton
            sx={{
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              },
            }}
          >
            <Group>
              <Avatar
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                radius="xl"
              />
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  Amy Horsefighter
                </Text>
                <Text color="dimmed" size="xs">
                  ahorsefighter@gmail.com
                </Text>
              </Box>

              {theme.dir === 'ltr' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Group>
          </UnstyledButton>
        </Box>
      </Navbar.Section>
    </Navbar>
  );
}
