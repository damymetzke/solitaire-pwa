import "./cardCollection";
import CardCollection from "./cardCollection";
import { loadCards } from "./loadCard";
import "./canvasManager";
import DragManager from "./dragManager";

const canvasElement = <HTMLCanvasElement>document.getElementById("draw-target");

const drawContext = canvasElement.getContext("2d");

drawContext.imageSmoothingEnabled = false;

let collection: CardCollection = null;
let dragManager: DragManager = null;

function loop() {
  let shouldDraw = false;

  shouldDraw ||= dragManager.drawUpdate();

  if (shouldDraw) {
    drawContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    collection.draw(drawContext);
  }

  requestAnimationFrame(loop);
}

async function run() {
  const [card, cardBack] = await loadCards([
    (await import("../img/card.png")).default,
    (await import("../img/card-back.png")).default,
  ]);

  collection = CardCollection.createDisplay(cardBack, [card]);
  dragManager = new DragManager(collection);

  collection.cards[52].isFront = false;

  collection.draw(drawContext);

  requestAnimationFrame(loop);
}

run();
