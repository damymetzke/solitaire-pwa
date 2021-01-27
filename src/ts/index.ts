import "../style/style.scss";

import wasmModule from "../cpp/wasm/wasm.cpp";

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

wasmModule().then((wasmInstance) => {
  console.log(wasmInstance.ccall("ping", "string", [], []));
});
