import * as solitaire from "../solitaire/solitaire";

// todo: use a better suited type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postMessageToMain = <(data: any) => void>postMessage;

async function run() {
  await solitaire.waitUntilLoaded();
  postMessageToMain({ type: "loaded" });
}

run();
