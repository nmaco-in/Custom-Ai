# Custom Chat Application using Cloudflare Workers AI and system prompt

A web based chat interface built on [Cloudflare Pages](https://pages.cloudflare.com) that allows for exploring [Text Generation models](https://developers.cloudflare.com/workers-ai/models/#text-generation) on [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/). Design is built using [tailwind](https://tailwindcss.com/).



This project makes use of [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to maintain state. We have better solutions available (more coming soon).

# please dont forget to update your system prompt in [index.tsx](src/index.tsx) and [script.js](public/static/script.js)

# upload your logo i.e [logo.png](/public/static/logo.png)  and [favicon.ico](/public/static/favicon.ico)  in [public/static](/public/static/) 

This is a template repository. Please feel free to create your own repository from this one by using the "Use this template" button. It's right next to the ⭐️ this repo button, which you could totally do as well if you wanted to.

This is, like all of us, a Work in Progress.

## Installation

```bash
npm install
# If this is your first time using workers by cloudflare
npx wrangler login
```

## Develop

This uses the local Vite server for rapid development

```bash
npm run dev
```

### Preview

This builds and runs in Wrangler your site locally, just as it will run on production

```bash
npm run preview
```

## Deploy

This hosts your site on [Cloudflare Pages](https://pages.cloudflare.com)

```bash
npm run deploy
```

###  Debug

```bash
npx wrangler pages deployment tail
```


# by: [R3AP3Reditz](https://github.com/iotserver24)
