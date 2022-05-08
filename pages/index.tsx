import { Container, Grid, NumberInput, Pagination, useMantineTheme } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Numbers } from 'tabler-icons-react';
import FileGridCol from '../components/FileGridCol';
import { extractMarkdownFromContent, MarkdownFile } from '../util/extractMarkdownFromContent';
import { extractMetadata } from '../util/extractMetadata';
import { octokit } from '../util/octokit';
import { getContent } from '../util/octokit/content';
import { getUser } from '../util/octokit/user';

interface ServerProps {
  files: MarkdownFile[];
}

function HomePage({ files }: ServerProps) {
  const theme = useMantineTheme();

  if (!files || files.length <= 0) return <>Loading...</>;

  const getTotalPages = (f: MarkdownFile[], pp: number) => Math.max(Math.ceil(f.length / pp), 1);

  const [perPage, setPerPage] = useState(files.length);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(getTotalPages(files, perPage));
  const [selectedFiles, setSelectedFiles] = useState(files.slice(0, perPage));

  const filesToGridCol = (f: MarkdownFile[]) =>
    f.map((file, index) => <FileGridCol file={file} key={index} />);

  useEffect(() => {
    setPage(1);
    setTotalPages(getTotalPages(files, perPage));
    setSelectedFiles(files.slice(0, perPage));
  }, [files]);

  useEffect(() => {
    setTotalPages(getTotalPages(files, perPage));
    const startingPoint = Math.max(0, activePage - 1) * perPage;
    setSelectedFiles(files.slice(startingPoint, startingPoint + perPage));
  }, [activePage, perPage]);

  return (
    <Container px="sm" py="xl">
      <Grid
        gutter="md"
        grow
        sx={{
          gap: theme.spacing.sm,
        }}
      >
        {filesToGridCol(selectedFiles)}
      </Grid>
      <Container my={theme.spacing.lg} mx={0} p={0} sx={{ display: 'flex', flexDirection: 'row' }}>
        <Pagination
          page={activePage}
          onChange={setPage}
          total={totalPages}
          initialPage={1}
          m={0}
          p={0}
          sx={{ alignItems: 'end' }}
        />
        <NumberInput
          label="Items per page"
          value={perPage}
          onChange={(val) => {
            if (val) setPerPage(val);
          }}
          icon={<Numbers />}
          min={1}
          max={Math.min(files.length, 50)}
          sx={{ marginLeft: 'auto' }}
        />
      </Container>
    </Container>
  );
}

export async function getServerSideProps(): Promise<{ props: ServerProps }> {
  const repo = process.env.REPOSITORY;
  if (!repo) throw new Error('Missing repository.');

  const { login } = await getUser(octokit);

  const metadataContent = await getContent(octokit, {
    owner: login,
    repo,
    path: 'metadata.json',
    mediaType: { format: 'application/vnd.github.VERSION.raw' },
  });

  const content = await getContent(octokit, { owner: login, repo });

  // @ts-expect-error
  const metadata = extractMetadata(metadataContent.content);

  const extracted = extractMarkdownFromContent(content, metadata);

  return { props: { files: extracted } };
}

export default HomePage;
