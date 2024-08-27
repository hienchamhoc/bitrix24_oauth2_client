## Getting Started

First, copy bitrix24 domain and client id into next.config.mjs file:

```bash
env: {
    BITRIX24_DOMAIN: {BITRIX24_DOMAIN},
    APP_ID: {CLIENT_ID},
}
```

Second, install the dependencies:

```bash
npm install
# or
yarn
```

Next, run the client:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the client.

Finally, use server url from ngrok to install app.
