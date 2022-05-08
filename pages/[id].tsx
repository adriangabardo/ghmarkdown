import { Stack } from '@mantine/core';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import showdown from 'showdown';
import { AuthorInfo } from '../components/AuthorInfo';
import RichText from '../components/RichText';
import { Author } from '../types/Author.types';
import { octokit } from '../util/octokit';
import { getContent } from '../util/octokit/content';
import { getUser } from '../util/octokit/user';

const converter = new showdown.Converter();

interface ServerProps {
  content: string;
  name?: string;
  author: Author;
}

function MarkdownPage({ content, name, author }: ServerProps) {
  const [value, onChange] = useState(converter.makeHtml(Buffer.from(content, 'base64').toString()));
  return (
    <>
      <Head>
        <title>{name ?? 'Poetry'} - Adrian Gabardo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <Stack px="sm" py="xl" spacing="md">
        <RichText value={value} onChange={onChange} readOnly />
        <AuthorInfo {...author} />
      </Stack>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<{ props: ServerProps }> => {
  const { id } = context.params ?? {};

  if (!id || id === undefined || Array.isArray(id)) throw new Error('ID missing.');

  const repo = process.env.REPOSITORY;
  if (!repo) throw new Error('Missing repository.');

  const { login, avatar_url, bio, email, html_url, ...user } = await getUser(octokit);

  const author: Author = {
    avatar_url,
    bio: bio || null,
    name: user.name || null,
    email: email || null,
    url: html_url,
  };

  // @ts-expect-error
  const { content, name } = await getContent(octokit, {
    owner: login,
    repo,
    path: id,
    mediaType: { format: 'application/vnd.github.VERSION.html' },
  });

  if (!content) throw new Error('Failed to retrieve content.');

  return { props: { content, name, author } };
};

export default MarkdownPage;
