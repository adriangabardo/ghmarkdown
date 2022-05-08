import React, { useState, useEffect } from 'react';
import { Container, Grid, useMantineTheme, Pagination } from '@mantine/core';
import FileGridCol from '../components/FileGridCol';
import { extractMarkdownFromContent, MarkdownFile } from '../util/extractMarkdownFromContent';
import { octokit } from '../util/octokit';
import { getContent } from '../util/octokit/content';
import { getUser } from '../util/octokit/user';

interface ServerProps {
  files: MarkdownFile[];
}

const PER_PAGE = 10;

function HomePage({ files }: ServerProps) {
  const theme = useMantineTheme();

  if (!files || files.length <= 0) return <>Loading...</>;

  const getTotalPages = () => Math.max(Math.round(files.length / PER_PAGE), 1);

  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(getTotalPages());
  const [selectedFiles, setSelectedFiles] = useState(files.slice(0, PER_PAGE));

  const filesToGridCol = (f: MarkdownFile[]) =>
    f.map((file, index) => <FileGridCol file={file} key={index} />);

  useEffect(() => {
    setPage(1);
    setTotalPages(getTotalPages());
    setSelectedFiles(files.slice(0, PER_PAGE));
  }, [files]);

  useEffect(() => {
    const startingPoint = Math.max(0, activePage - 1) * PER_PAGE;
    setSelectedFiles(files.slice(startingPoint, startingPoint + PER_PAGE));
  }, [activePage]);

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
      <Pagination
        page={activePage}
        onChange={setPage}
        total={totalPages}
        initialPage={1}
        my={theme.spacing.lg}
      />
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
