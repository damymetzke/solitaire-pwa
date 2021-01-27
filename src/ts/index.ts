import "../style/style.scss";

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

const solitaireWorker = new Worker("./solitaire/solitaire.ts");
