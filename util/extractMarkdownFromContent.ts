// {
//     name: 'README.md',
//     path: 'README.md',
//     sha: 'fd569f8269ed2820fe728e42d1ab550cb8f87efa',
//     size: 618,
//     url: 'https://api.github.com/repos/adriangabardo/bad-grandma/contents/README.md?ref=main',
//     html_url: 'https://github.com/adriangabardo/bad-grandma/blob/main/README.md',
//     git_url: 'https://api.github.com/repos/adriangabardo/bad-grandma/git/blobs/fd569f8269ed2820fe728e42d1ab550cb8f87efa',
//     download_url: 'https://raw.githubusercontent.com/adriangabardo/bad-grandma/main/README.md',
//     type: 'file',
//     _links: {
//       self: 'https://api.github.com/repos/adriangabardo/bad-grandma/contents/README.md?ref=main',
//       git: 'https://api.github.com/repos/adriangabardo/bad-grandma/git/blobs/fd569f8269ed2820fe728e42d1ab550cb8f87efa',
//       html: 'https://github.com/adriangabardo/bad-grandma/blob/main/README.md'
//     }
//   }

import { Metadata } from './extractMetadata';

interface Content {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string | null;
  git_url: string | null;
  download_url: string | null;
  type: 'file' | 'submodule' | 'symlink' | string;
  _links: {
    self: string;
    git: string | null;
    html: string | null;
  };
}

export interface MarkdownFile {
  name: string;
  path: string;
  sha: string;
  url: string;
  description: string | null;
  image: string | null;
}

export const extractMarkdownFromContent = (
  content: Content | Content[],
  metadata: Metadata[]
): MarkdownFile[] => {
  const isContentArray = (obj: Content | Content[]): obj is Content[] => Array.isArray(obj);

  const findMetadata = (name: string): { description: string | null; image: string | null } => {
    const found = metadata.find((entry) => entry.id === name);
    if (!found) return { description: null, image: null };

    return { description: found.description || null, image: found.image || null };
  };

  if (!isContentArray(content)) {
    if (content.type !== 'file') throw new Error('Invalid content.');

    const entryMetadata = findMetadata(content.name);

    return [
      {
        name: content.name,
        path: content.path,
        sha: content.sha,
        url: content.url,
        ...entryMetadata,
      },
    ];
  }

  return content
    .filter((entry) => entry.type === 'file' && entry.name.match(/(.)+(\.md){1}$/))
    .map((entry) => {
      const entryMetadata = findMetadata(entry.name);

      return {
        name: entry.name,
        path: entry.path,
        sha: entry.sha,
        url: entry.url,
        ...entryMetadata,
      };
    });
};
