import { coordinatesFromScreen } from "./canvasManager";
import Card from "./card";
import CardCollection from "./cardCollection";

const canvasElement = <HTMLCanvasElement>(
  document.getElementById("draw-target-move")
);

export default class DragManager {
  collection: CardCollection;
  dirty = 2;
  draggingCard: Card = null;
  draggingOffsetX = 0;
  draggingOffsetY = 0;

  constructor(collection: CardCollection) {
    this.collection = collection;

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

  drawUpdate(): number {
    const result = this.dirty;
    this.dirty = 0;
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
      const card = this.collection.cards[i];
      if (
        cardX > card.left &&
        cardX < card.left + 1 &&
        cardY > card.top &&
        cardY < card.top + 1.5
      ) {
        this.draggingCard = card;
        card.isMoving = true;
        this.draggingOffsetX = -(cardX - card.left);
        this.draggingOffsetY = -(cardY - card.top);
        this.dirty = 2;

        break;
      }
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (this.draggingCard === null) {
      return;
    }

    this.dirty = Math.max(1, this.dirty);
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

    this.draggingCard.isMoving = false;
    this.draggingCard = null;
    this.dirty = 2;
  }
}
