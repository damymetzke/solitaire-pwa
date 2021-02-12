import "./cardCollection";
import CardCollection from "./cardCollection";
import { batchLoadCards } from "./loadCard";
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
  const cardSources = [
    import("../../img/card-back.png"),
    import("../../img/card.png"),
  ];
  const [cardBack, cards] = await batchLoadCards(cardSources);

  collection = CardCollection.createDisplay(cardBack, cards);
  dragManager = new DragManager(collection);

  requestAnimationFrame(loop);
}

run();
