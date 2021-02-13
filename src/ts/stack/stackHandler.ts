import { DrawState } from "../draw/drawState";
import Card from "../draw/card";
import CardCollection from "../draw/cardCollection";

interface MoveCommand {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  length: number;
  card: Card;
  progress: number;
}

export default class StackHandler {
  moveCommands: MoveCommand[];
  collection: CardCollection;

  constructor(cardBackImage: HTMLImageElement, cardImages: HTMLImageElement[]) {
    this.collection = new CardCollection([2], cardBackImage);
    this.collection.cards[0][0].canDrag = true;
    this.collection.cards[0][1].canDrag = true;
  }

  getHome(stack: number, index: number): [number, number] {
    return [0, 0];
  }
  // moveToHome(stack: number, index: number): void {}
  // setToHome(stack: number, index: number): void {}
  resetAll(): void {
    this.collection.forEachCard((card, _index, stackIndex, cardIndex) => {
      const [homeX, homeY] = this.getHome(stackIndex, cardIndex);
      card.top = homeY;
      card.left = homeX;
    });
  }

  drawUpdate(delta: number): DrawState {
    if (this.moveCommands.length == 0) {
      return DrawState.NONE;
    }
    this.moveCommands.forEach((command) => {
      command.progress += delta / command.length;
      command.card.top =
        command.startY + command.progress * (command.endY - command.startY);
      command.card.left =
        command.startX + command.progress * (command.endX - command.startX);
    });
    return DrawState.MOVE_ONLY;
  }
}
