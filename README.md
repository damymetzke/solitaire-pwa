# Solitaire PWA

[![Lint](https://github.com/damymetzke/solitair-pwa/workflows/Lint/badge.svg?branch=main)](https://github.com/damymetzke/solitair-pwa/actions?query=workflow%3ALint)
[![Run Tests](https://github.com/damymetzke/solitaire-pwa/workflows/Run%20Tests/badge.svg?branch=main)](https://github.com/damymetzke/solitaire-pwa/actions?query=workflow%3A%22Run+Tests%22)
[![Build](https://github.com/damymetzke/solitaire-pwa/workflows/Build/badge.svg?branch=main)](https://github.com/damymetzke/solitaire-pwa/actions?query=workflow%3ABuild)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6c5a8c95-4a22-4cb5-a041-20cc5966b597/deploy-status)](https://solitaire-pwa.netlify.app)

This project is a PWA implementation of Solitaire.
In addition to this the app uses Wasm and C++.

## Quick setup

Requirements:

- [NodeJS](https://nodejs.org) (14.x)
- [npm](https://www.npmjs.com/get-npm) (installed with NodeJS)
- [CMake](https://cmake.org) (3.18+)
- [Clang](https://clang.llvm.org) (11.x)
- [EMScripten](https://emscripten.org/docs/getting_started/downloads.html)
  (_Installing emscripten is significantly more involved._
  _As such the link leads to the installation guide._)

This app uses [Parcel](https://parceljs.org) to both bundle the code, and run the development server.
To create a development server run the following commands:

```bash
npm i
npm run setup-cmake
npm run build-cmake
npm run serve
```

This will host a development server at `localhost:1234`
To generate a distributable output run `npm run dist` instead.

**Important**

> The C++ build system is distinct from Parcel.
> This results in parcel not listening to all file changes.
> In order to update the C++ code do the following:
>
> 1. Run `npm run build-cmake`.
> 2. Manually re-save `src/cpp/wasm/wasm.cpp` to trigger the recompilation of the wasm file.

## The build system

Parcel is in charge of bundling and compiling most of the assets.
The only exception to this is the compilation of the C++ code.
This is done in 2 steps:

- Compile most of the c++ code as `libSolitaire.a` using CMake.
- Compile `src/cpp/wasm/wasm.cpp` using emscripten, linking with `libSolitaire.a` file.
