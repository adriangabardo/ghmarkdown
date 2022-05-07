import { Octokit } from 'octokit';

export const getUser = async (client: Octokit) =>
  client.rest.users.getAuthenticated().then((result) => result.data);
