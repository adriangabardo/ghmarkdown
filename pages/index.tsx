import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Text,
  useMantineTheme,
  AspectRatio,
} from '@mantine/core';
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
      md={3}
      lg={4}
      sx={{
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
      }}
      key={index}
    >
      <Card shadow="sm" p="lg">
        <Card.Section component="a" href={`/${encodeURI(file.path)}`}>
          <AspectRatio ratio={16 / 9} mx="auto">
            <Image src="https://source.unsplash.com/random" alt="Norway" key={index} />
          </AspectRatio>
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500} sx={{ textTransform: 'capitalize' }}>
            {file.name.replace('.md', '')}
          </Text>
        </Group>

        <Text size="sm" style={{ color: theme.colors.dark[4], lineHeight: 1.5 }}>
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway
        </Text>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
          component="a"
          leftIcon={<Book size={14} />}
          href={`/${encodeURI(file.path)}`}
        >
          Read More
        </Button>
      </Card>
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
