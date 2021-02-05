import "./cardCollection";
import CardCollection from "./cardCollection";
import { loadCards } from "./loadCard";

const drawContext = (<HTMLCanvasElement>(
  document.getElementById("draw-target")
)).getContext("2d");

drawContext.imageSmoothingEnabled = false;

let collection: CardCollection = null;

function loop() {
  const shouldDraw = false;

  if (shouldDraw) {
    collection.draw(drawContext);
  }

  requestAnimationFrame(loop);
}

async function run() {
  const [card, cardBack] = await loadCards([
    (await import("../img/card.png")).default,
    (await import("../img/card-back.png")).default,
  ]);

  collection = CardCollection.createIncremental(53, cardBack, [card]);

  collection.cards[52].isFront = false;

  collection.draw(drawContext);

  requestAnimationFrame(loop);
}

run();
