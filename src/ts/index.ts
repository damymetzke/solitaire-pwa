import "../style/style.scss";

const JS_NAME = document
  .querySelector("head script")
  .getAttribute("src")
  .slice(1);
const CSS_NAME = document
  .querySelector("head link")
  .getAttribute("href")
  .slice(1);

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
