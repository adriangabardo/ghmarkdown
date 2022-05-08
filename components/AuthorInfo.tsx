import { Avatar, Container, Group, Text } from '@mantine/core';
import React from 'react';
import { Author } from '../types/Author.types';

export function AuthorInfo({ avatar_url, name, bio, email, url }: Author) {
  return (
    <Container ml={0} p={0}>
      <Group noWrap>
        <Avatar src={avatar_url} size={60} radius="md" />
        <Container sx={{ display: 'flex', flexDirection: 'column' }} pl={0} ml={0}>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            {bio}
          </Text>

          <Text size="lg" weight={500} component="a" href={url}>
            {name}
          </Text>

          <Text size="xs" color="dimmed" component="a" href={`mailto:${email}`}>
            {email}
          </Text>
        </Container>
      </Group>
    </Container>
  );
}
