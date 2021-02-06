import "./cardCollection";
import CardCollection from "./cardCollection";
import { loadCards } from "./loadCard";
import "./canvasManager";
import DragManager from "./dragManager";
import { DrawState } from "./drawState";

const staticCanvasElement = <HTMLCanvasElement>(
  document.getElementById("draw-target-static")
);
const moveCanvasElement = <HTMLCanvasElement>(
  document.getElementById("draw-target-move")
);

const staticDrawContext = staticCanvasElement.getContext("2d");
const moveDrawContext = moveCanvasElement.getContext("2d");

staticDrawContext.imageSmoothingEnabled = false;
moveDrawContext.imageSmoothingEnabled = false;

let collection: CardCollection = null;
let dragManager: DragManager = null;

function loop() {
  let shouldDraw = DrawState.NONE;

  shouldDraw = Math.max(shouldDraw, dragManager.drawUpdate());

  if (shouldDraw === DrawState.MOVE_ONLY) {
    moveDrawContext.clearRect(
      0,
      0,
      moveCanvasElement.width,
      moveCanvasElement.height
    );
    collection.drawMove(moveDrawContext);
  }

  if (shouldDraw === DrawState.ALL) {
    staticDrawContext.clearRect(
      0,
      0,
      staticCanvasElement.width,
      staticCanvasElement.height
    );
    moveDrawContext.clearRect(
      0,
      0,
      moveCanvasElement.width,
      moveCanvasElement.height
    );
    collection.drawStatic(staticDrawContext);
    collection.drawMove(moveDrawContext);
  }

  requestAnimationFrame(loop);
}

async function run() {
  const [card, cardBack] = await loadCards([
    (await import("../../img/card.png")).default,
    (await import("../../img/card-back.png")).default,
  ]);

  collection = CardCollection.createDisplay(cardBack, [card]);
  dragManager = new DragManager(collection);

  collection.cards[52].isFront = false;

  requestAnimationFrame(loop);
}

run();
