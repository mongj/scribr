# Scribr

Scribr is a Next.js application that allows users to transcribe YouTube videos, and download transcripts in various formats (text, JSON, SRT, WebVTT) for free.
This app is mainly a frontend wrapper for my [youtube-transcriber-api](https://github.com/mongj/youtube-transcriber-api).

Try it out here: https://scribr.vercel.app/

![scribr-1](https://github.com/mongj/scribr/assets/87565927/198730c8-ffd5-4079-8867-b81b907514b3)

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Local Development](#local-development)
3. [Deployment](#deployment)
4. [Future Plans](#future-plans)

## Tech stack

-   React.js + Typescript
-   TailwindCSS
-   ChakraUI
-   Zustand

## Local development

### Prerequisites

Before you begin, ensure you have [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/) installed

### Installation

1. Clone the repository:

```
git clone https://github.com/mongj/scribr.git
```

2. Change into project directory:

```
cd scribr
```

3. Install dependencies

```
npm install
```

4. Running the development server

```
npm run dev
```

Open your browser and navigate to http://localhost:3000.

5. For building and deploying in production:

```
npm run build
npm start
```

## Deployment

Vercel is used as both the staging and production environment for the app. See [here](https://github.com/mongj/scribr/blob/main/.github/workflows/build-deploy.yml) for the GitHub actions workflow that handles deployment. If you are planning to use the same workflow, do note that you need to add the following secrets:

-   VERCEL_ORG_ID (access via `https://vercel.com/account`)
-   VERCEL_PROJECT_ID (access via `https://vercel.com/<user>/<project>/settings`)
-   VERCEL_ACCESS_TOKEN (access via `https://vercel.com/account/tokens`)

## Future Plans

-   Add translated transcripts
-   Set up UI testing

## Donation

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/mjzhang)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
