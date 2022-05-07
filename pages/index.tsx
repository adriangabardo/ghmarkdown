import { Button, Container, Grid, Text, Title, useMantineTheme } from '@mantine/core';
import { Book } from 'tabler-icons-react';
import { extractMarkdownFromContent, MarkdownFile } from '../util/extractMarkdownFromContent';
import { octokit } from '../util/octokit';
import { getContent } from '../util/octokit/content';
import { getUser } from '../util/octokit/user';

interface ServerProps {
  files: MarkdownFile[];
}

function HomePage({ files }: ServerProps) {
  const theme = useMantineTheme();

  if (!files || files.length <= 0) return <>Loading...</>;

  const items = files.map((file, index) => (
    <Grid.Col
      span={4}
      sx={{
        backgroundColor: theme.colors.dark[5],
      }}
      key={index}
    >
      <Container fluid>
        <Title order={3}>{file.name}</Title>
        <Text>Some super cool description of some sort...</Text>
        <Button
          component="a"
          href={`/${encodeURI(file.path)}`}
          variant="outline"
          leftIcon={<Book size={14} />}
          size="sm"
          p={0}
          styles={{
            root: {
              border: 0,
              '&:hover': {
                backgroundColor: 'transparent',
                color: theme.colors.blue[7],
              },
              '&:visited': {
                color: theme.colors.violet[2],
              },
              '&:visited&:hover': {
                color: theme.colors.violet[5],
              },
            },
          }}
        >
          <Text>Read more</Text>
        </Button>
      </Container>
    </Grid.Col>
  ));

  return (
    <Container px="sm" py="xl">
      <Grid
        gutter="md"
        grow
        sx={{
          gap: theme.spacing.sm,
        }}
      >
        {items}
      </Grid>
    </Container>
  );
}

export async function getServerSideProps(): Promise<{ props: ServerProps }> {
  const repo = process.env.REPOSITORY;
  if (!repo) throw new Error('Missing repository.');

  const { login } = await getUser(octokit);
  const content = await getContent(octokit, { owner: login, repo });

  const extracted = extractMarkdownFromContent(content);

  return { props: { files: extracted } };
}

export default HomePage;
