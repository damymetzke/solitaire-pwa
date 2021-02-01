import "../style/style.scss";

import * as solitaire from "./solitaire/solitaire";

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
  console.log(solitaire.ping());
}

run();
