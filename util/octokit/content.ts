import { Octokit } from 'octokit';

/**
 * Fetches content from a repository on GitHub
 * @param client - Octokit client
 * @param param.owner - The repository owner (login property from .getUser)
 * @param param.repo - The repository
 * @param param.path - A specific file in the repository
 * @returns The contents of a repository or file
 */
export const getContent = async (
  client: Octokit,
  {
    owner,
    repo,
    path = '',
    mediaType,
  }: {
    owner: string;
    repo: string;
    path?: string;
    mediaType?: {
      format?: string | undefined;
      previews?: string[] | undefined;
    };
  }
) =>
  client.rest.repos
    .getContent({
      owner,
      path,
      repo,
      mediaType,
    })
    .then((response) => response.data);
