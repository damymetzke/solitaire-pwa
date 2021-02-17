import "./cardCollection";
import CardCollection from "./cardCollection";
import { batchLoadCards } from "./loadCard";
import "./canvasManager";
import DragManager from "./dragManager";
import { DrawState } from "./drawState";
import StackHandler from "../stack/stackHandler";
import DisplayStackHandler from "../stack/displayStackHandler";

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
let stackHandler: StackHandler = null;
let previousTime: DOMHighResTimeStamp = 0;

function loop(time: number) {
  const delta = time - previousTime;
  previousTime = time;

  let shouldDraw = DrawState.NONE;

  shouldDraw = Math.max(shouldDraw, dragManager.drawUpdate());
  shouldDraw = Math.max(shouldDraw, stackHandler.drawUpdate(delta));

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

export function start(cardBack: HTMLImageElement, cards: HTMLImageElement[]) {
  stackHandler = new DisplayStackHandler(cardBack, cards);
  collection = stackHandler.collection;
  dragManager = new DragManager(collection, stackHandler);

  previousTime = performance.now();
  requestAnimationFrame(loop);
}
