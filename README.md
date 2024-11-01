<div align="center">
    <h1>Next.js Boilerplate With Dev Containers Config</h1>
</div>

This is a [Next.js](https://nextjs.org) boilerplate project based off of
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
with some extra configs to bootstrap your Next.js project.

## Table of Contents <!-- omit in toc -->

- [Stack](#stack)
- [Getting Started](#getting-started)
  - [Launching the Dev Container](#launching-the-dev-container)
    - [Note on Podman](#note-on-podman)
  - [Project Struture](#project-struture)
  - [Running the Server](#running-the-server)
  - [Vercel Configuration](#vercel-configuration)
- [Other Development Tools](#other-development-tools)
- [Development Logistics](#development-logistics)
  - [Branching and Deployment Strategy](#branching-and-deployment-strategy)
  - [Preview Deployments](#preview-deployments)
  - [Production and Hotfix Deployments](#production-and-hotfix-deployments)

## Stack

- **Node.js & Typescript Dev Container** with `zsh` and `Oh My Zsh`
- **Package Manager:** `pnpm`
- **Linter:** `ESLint` with default Next.js configuration
- **Formatter:** `Prettier` with minimal customizations
- **Deployment Platform:** `Vercel`

## Getting Started

### Launching the Dev Container

If you would like to use a dev container, first use your favorite editor/IDE to reopen the project in a dev container.
Learn more on the [official Development Containers website](https://containers.dev/supporting).

#### Note on Podman

Due to how Podman launches containers, your editor/IDE may face permission issues when configuring/attaching to the container.
To solve this, set the following in your containers config file (such as `$HOME/.config/containers/containers.conf`):

```ini
[containers]
label=false
userns="keep-id"
```

### Project Struture

This boilerplate follows the
[recommended project structure](https://nextjs.org/docs/getting-started/project-structure)
for Next.js applications.

### Running the Server

To run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`.
The page auto-updates as you edit the file.

### Vercel Configuration

If you are planning on deploying to Vercel using the GitHub Actions workflows included in this boilerplate,
you will need to create the following secrets in your GitHub repository.
Go to your repository settings, click on `Secrets and Variables`, then `Actions`, then create the following

- Name: `VERCEL_ORG_ID`
  - Value: The "**_Team ID_**" found in your Vercel team/org's general settings
- Name: `VERCEL_PROJECT_ID`
  - Value: The "**_Project ID_**" found in your Vercel project's general settings
- Name: `VERCEL_TOKEN`
  - Value: The access token with permission to deploy projects within the Vercel team/org
  - See [Vercel documentation](https://vercel.com/guides/how-do-i-use-a-vercel-api-access-token#creating-an-access-token) for more details

## Other Development Tools

To run the linter, ESLint:

```bash
pnpm lint
```

To run the formatter, Prettier:

```bash
# Find violations using
pnpm format

# Format files in-place using
pnpm format --write
```

## Development Logistics

### Branching and Deployment Strategy

This boilerplate comes with a minimal Vercel configuration and GitHub Action workflows that follow
[Trunk-Based Development](https://trunkbaseddevelopment.com/) patterns.

The default branch, `main`, serves as the trunk. All feature development
should be done on a separate branch based off of the trunk and merged into
the trunk and have CI/CD run against it.

Any hotfixes needed for a particular release should be pushed to a short-lived branch called `hotfix`.

### Preview Deployments

Every merge into the `main` branch will trigger a preview deployment.
This type of deployment is used to preview the project at a particular commit in `main`,
such as demoing and verifying a feature before pushing it to production.

This CD workflow is located in [.github/workflows/preview-deploy.yaml](./.github/workflows/preview-deploy.yaml).

### Production and Hotfix Deployments

Pushing a semantic version tag with the suffix `-RELEASE` and
pushes to the `hotfix` branch will trigger a production deployment.
This will deploy the commit pointed to by either of the above to production.

The hotfix CD workflow is located in [.github/workflows/hotfix-deploy.yaml](./.github/workflows/hotfix-deploy.yaml), and the standard release workflow is located in [.github/workflows/prod-deploy.yaml](./.github/workflows/prod-deploy.yaml).
