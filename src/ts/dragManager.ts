import { coordinatesFromScreen } from "./canvasManager";
import CardCollection from "./cardCollection";

const canvasElement = <HTMLCanvasElement>document.getElementById("draw-target");

export default class DragManager {
  collection: CardCollection;
  constructor(collection: CardCollection) {
    this.collection = collection;

    canvasElement.addEventListener("mousedown", (event) => {
      this.onMouseDown(event);
    });
  }
  onMouseDown(event: MouseEvent) {
    const [cardX, cardY] = coordinatesFromScreen(
      event.offsetX,
      event.offsetY
    ).toCard();
    const hasClicked = this.collection.cards.some((card, index) => {
      if (
        cardX > card.left &&
        cardX < card.left + 1 &&
        cardY > card.top &&
        cardY < card.top + 1.5
      ) {
        console.log(`Clicked card ${index}`);
        return true;
      }
      return false;
    });

    if (!hasClicked) {
      console.log("Clicked nothing!");
    }
  }
}
