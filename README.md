# Solitair PWA

[![Lint](https://github.com/damymetzke/solitair-pwa/workflows/Lint/badge.svg?branch=main)](https://github.com/damymetzke/solitair-pwa/actions?query=workflow%3ALint)
[![Build and Run Tests](https://github.com/damymetzke/solitair-pwa/workflows/Build%20and%20Run%20Tests/badge.svg?branch=main)](https://github.com/damymetzke/solitair-pwa/actions?query=workflow%3A%22Build+and+Run+Tests%22)

This project is a PWA implementation of solitair.
In addition to this the app uses wasm and c++.

## Quick setup

Requirements:

- [NodeJS](https://nodejs.org) (14.x)
- [npm](https://www.npmjs.com/get-npm) (installed with NodeJS)

This app uses [Parcel](https://parceljs.org) to both bundle the code, and run the development server.
To create a development server run the following commands:

```bash
npm i
npm run serve
```

This will host a development server at `localhost:1234`
To generate a distributable output run `npm run dist` instead.
