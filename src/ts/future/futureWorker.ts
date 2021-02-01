import * as solitaire from "../solitaire/solitaire";

async function run() {
  await solitaire.waitUntilLoaded();
  postMessage({ type: "loaded" });
}

run();
