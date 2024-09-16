# Klayr Explorer

Klayr Explorer is a basic blockchain explorer for the Klayr ecosystem, designed to help users navigate and explore the Klayr blockchain. This project is currently a work in progress as we work towards our Minimum Viable Product (MVP). The final version of Klayr Explorer will serve as the foundation for the future Klayr platform.

## Status

🚧 Work in Progress 🚧

Please note that this project is still under active development, and running it yourself is not yet advised. We are continuously working on building and refining the core functionalities. Once the project reaches a stable and feasible state, we will update this README with the correct steps for installation, usage, and contribution.

## Contact

For any questions or feedback, please contact us at hello@klayr.xyz.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `storybook`: a [Storybook](https://storybook.js.org) app with [Tailwind CSS](https://tailwindcss.com/) and [Next.js](https://nextjs.org/)
- `docs`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `web`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by both `web` and `docs` applications and documented in the `storybook` app
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Setup Storybook

### 1. Install dependencies

Do `yarn install` in the root of the repo.

### 2. Build packages/ui

This is necessary for the storybook app to use the ui package. Do `yarn workspace @repo/ui build` in the root of the repo or `yarn build` in the `packages/ui` directory.

### 3. Start Storybook

Do `yarn workspace storybook storybook` in the root of the repo or `yarn storybook` in the `apps/storybook` directory and it should open in your browser on port 6006.

## Setup Web App

### 1. Install dependencies

Do `yarn install` in the root of the repo.

### 2. Build packages/ui

This is necessary for the web app to use the ui package. Do `yarn workspace @repo/ui build` in the root of the repo or `yarn build` in the `packages/ui` directory.

### 3. Start Dev Server

Do `yarn workspace web dev` in the root of the repo or `yarn dev` in the `apps/web` directory and it should be available in your browser on port 3000.

### 4. Build to check for errors

When you're done do `yarn workspace web build` in the root of the repo or `yarn build` in the `apps/web` directory to check for any errors before pushing.

## License

Copyright 2024 Klayr Labs B.V.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
