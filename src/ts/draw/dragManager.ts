import StackHandler from "../stack/stackHandler";
import { coordinatesFromScreen } from "./canvasManager";
import Card from "./card";
import CardCollection from "./cardCollection";
import { DrawState } from "./drawState";

const canvasElement = <HTMLCanvasElement>(
  document.getElementById("draw-target-move")
);

export default class DragManager {
  collection: CardCollection;
  stackHandler: StackHandler;
  dirty = DrawState.ALL;
  draggingCard: Card = null;
  draggingOffsetX = 0;
  draggingOffsetY = 0;

  constructor(collection: CardCollection, stackHandler: StackHandler) {
    this.collection = collection;
    this.stackHandler = stackHandler;

    canvasElement.addEventListener("mousedown", (event) => {
      this.onMouseDown(event);
    });
    canvasElement.addEventListener("mousemove", (event) => {
      this.onMouseMove(event);
    });

    document.addEventListener("mouseup", (event) => {
      this.onMouseUp(event);
    });
  }

  drawUpdate(): DrawState {
    const result = this.dirty;
    this.dirty = DrawState.NONE;
    return result;
  }

  onMouseDown(event: MouseEvent): void {
    if (this.draggingCard !== null) {
      console.warn(
        "Attempt made to drag card when a card is already being dragged!"
      );
      return;
    }

    const [cardX, cardY] = coordinatesFromScreen(
      event.offsetX,
      event.offsetY
    ).toCard();

    for (let i = this.collection.cards.length - 1; i >= 0; --i) {
      const stack = this.collection.cards[i];
      for (let j = stack.length - 1; j >= 0; --j) {
        const card = stack[j];
        if (
          card.canDrag &&
          cardX > card.left &&
          cardX < card.left + 1 &&
          cardY > card.top &&
          cardY < card.top + 1.5
        ) {
          this.draggingCard = card;
          card.isMoving = true;
          this.draggingOffsetX = -(cardX - card.left);
          this.draggingOffsetY = -(cardY - card.top);
          this.dirty = DrawState.ALL;
          break;
        }
      }
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.draggingCard === null) {
      return;
    }

    this.dirty = Math.max(DrawState.MOVE_ONLY, this.dirty);
    const [cardX, cardY] = coordinatesFromScreen(
      event.offsetX,
      event.offsetY
    ).toCard();

    this.draggingCard.left = cardX + this.draggingOffsetX;
    this.draggingCard.top = cardY + this.draggingOffsetY;
  }

  onMouseUp(event: MouseEvent): void {
    if (this.draggingCard === null) {
      return;
    }

    const [stackIndex, cardIndex] = this.collection.findCard(this.draggingCard);
    this.stackHandler.moveToHome(stackIndex, cardIndex);
    this.draggingCard = null;
    this.dirty = DrawState.ALL;
  }
}
