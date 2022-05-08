# GitHub Markdown Webpage Renderer

## Overview

This project leverages [Octokit.js](https://github.com/octokit/octokit.js/), Mantine's [Rich Text Editor](https://mantine.dev/others/rte/) and [Showdown.JS](https://github.com/showdownjs/showdown)'s HTML→Markdown converter to create a website that reads through any of a user's Github Repositories (including private ones) and serves all their Markdown files in the root directory of said repository.

## Getting started

The first step is likely to be forking this repository for your own usage. Then:

### Starting in development

#### Environment Variables

Create a `.env.local` file in the root of the repository, in said file you need the following:

```env
PAT=
REPOSITORY=
```

- PAT - [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) - **DO NOT COMMIT TO REPOSITORY**
- REPOSITORY - Which repository linked to the same account as the above's PAT will we fetch Markdown files from (the repository can be private)

#### Starting the environment

```bash
yarn # or npm i
yarn dev # or npm run dev
```

## Deployment

This is a Next.JS application, deploying to Vercel's environment is the easiest way to get it served. Follow their instructions on https://vercel.com/solutions/nextjs.

The only extra step to follow is to set your environment variables on deployment just like the above `.env.local`.
