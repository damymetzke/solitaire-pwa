import * as solitaire from "../solitaire/solitaire";

// todo: use a better suited type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postMessageToMain = <(data: any) => void>postMessage;

async function run() {
  await solitaire.waitUntilLoaded();
  postMessageToMain({ type: "loaded" });
}

run();

function onCall(message) {
  const result = (() => {
    switch (message.function) {
      case "ping":
        return solitaire.ping();

      default:
        console.warn(
          `FutureInterface has recieved a call request for unsupported function: '${message.function}'.`
        );
    }
  })();

  postMessageToMain({ type: "call-return", id: message.id, result: result });
}

onmessage = (event) => {
  switch (event.data.type) {
    case "call":
      onCall(event.data);
      break;

    default:
      console.warn(
        `FutureInterface has recieved an unsupported message of type '${event.data.type}'.`
      );
  }
};
