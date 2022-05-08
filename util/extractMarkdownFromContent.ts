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
}

export const extractMarkdownFromContent = (content: Content | Content[]): MarkdownFile[] => {
  const isContentArray = (obj: Content | Content[]): obj is Content[] => Array.isArray(obj);

  if (!isContentArray(content)) {
    if (content.type !== 'file') throw new Error('Invalid content.');

    return [{ name: content.name, path: content.path, sha: content.sha, url: content.url }];
  }

  return content
    .filter((entry) => entry.type === 'file' && entry.name.match(/(.)+(\.md){1}$/))
    .map((entry) => ({
      name: entry.name,
      path: entry.path,
      sha: entry.sha,
      url: entry.url,
    }));
};