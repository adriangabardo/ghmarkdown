import { Container, Grid, useMantineTheme } from '@mantine/core';
import FileGridCol from '../components/FileGridCol';
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

  const items = files.map((file, index) => <FileGridCol file={file} key={index} />);

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
