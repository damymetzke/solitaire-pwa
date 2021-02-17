import "../style/style.scss";

import * as solitaire from "./solitaire/solitaire";
import { start as drawStart } from "./draw/draw";
import { batchLoadCards } from "./draw/loadCard";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register(`/service-worker.js${""}`, { scope: "/" })
      .then(
        function (registration) {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        function (err) {
          console.log("ServiceWorker registration failed: ", err);
        }
      );
  });
}

async function run() {
  await solitaire.waitUntilLoaded();

  const cardSources = [
    import("../img/card-back.png"),
    import("../img/card.png"),
  ];
  const [cardBack, cards] = await batchLoadCards(cardSources);

  drawStart(cardBack, cards);
}

run();
