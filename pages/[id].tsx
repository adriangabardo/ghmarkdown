import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import showdown from 'showdown';
import RichText from '../components/RichText';
import { octokit } from '../util/octokit';
import { getContent } from '../util/octokit/content';
import { getUser } from '../util/octokit/user';

const converter = new showdown.Converter();

interface ServerProps {
  content: string;
  name?: string;
}

function MarkdownPage({ content, name }: ServerProps) {
  const [value, onChange] = useState(converter.makeHtml(Buffer.from(content, 'base64').toString()));
  return (
    <>
      <Head>
        <title>{name ?? 'Poetry'} - Adrian Gabardo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <RichText value={value} onChange={onChange} readOnly />
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

  const { login } = await getUser(octokit);

  // @ts-expect-error
  const { content, name } = await getContent(octokit, {
    owner: login,
    repo,
    path: id,
    mediaType: { format: 'application/vnd.github.VERSION.html' },
  });

  if (!content) throw new Error('Failed to retrieve content.');

  return { props: { content, name } };
};

export default MarkdownPage;
