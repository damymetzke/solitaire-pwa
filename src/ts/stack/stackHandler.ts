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
  moveCommands: MoveCommand[] = [];
  collection: CardCollection = null;
  dirty: DrawState = DrawState.NONE;

  constructor(numCards: number[], cardBackImage: HTMLImageElement) {
    this.collection = new CardCollection(numCards, cardBackImage);
    this.collection.forEachCard((card, _index, stackIndex, cardIndex) => {
      const [homeX, homeY] = this.getHome(stackIndex, cardIndex);
      card.left = homeX;
      card.top = homeY;
    });
  }

  getHome(stack: number, index: number): [number, number] {
    return [0, 0];
  }
  moveToHome(stack: number, index: number): void {
    if (!this.collection.cardExists(stack, index)) {
      console.warn(`Attempt to move non existing card [${stack},${index}].`);
    }

    const card = this.collection.getCard(stack, index);
    const [homeX, homeY] = this.getHome(stack, index);

    this.moveCommands.push({
      startX: card.left,
      startY: card.top,
      endX: homeX,
      endY: homeY,
      length: Math.sqrt((homeX - card.left) ** 2 + (homeY - card.top) ** 2),
      card: card,
      progress: 0,
    });
    this.dirty = DrawState.MOVE_ONLY;
  }
  setToHome(stack: number, index: number): void {
    if (!this.collection.cardExists(stack, index)) {
      console.warn(`Attempt to set non existing card [${stack},${index}]`);
      return;
    }

    const card = this.collection.getCard(stack, index);
    const [homeX, homeY] = this.getHome(stack, index);
    card.left = homeX;
    card.top = homeY;
  }
  resetAll(): void {
    this.collection.forEachCard((card, _index, stackIndex, cardIndex) => {
      const [homeX, homeY] = this.getHome(stackIndex, cardIndex);
      card.top = homeY;
      card.left = homeX;
    });
  }

  drawUpdate(delta: number): DrawState {
    if (this.moveCommands.length == 0) {
      const result = this.dirty;
      this.dirty = DrawState.NONE;
      return result;
    }
    this.moveCommands = this.moveCommands.filter((command) => {
      command.progress = Math.min(
        command.progress + delta / command.length / 5000,
        1
      );
      command.card.top =
        command.startY + command.progress * (command.endY - command.startY);
      command.card.left =
        command.startX + command.progress * (command.endX - command.startX);
      if (command.progress < 1) {
        return true;
      }

      command.card.isMoving = false;
      this.dirty = DrawState.ALL;

      return false;
    });
    const result = Math.max(DrawState.MOVE_ONLY, this.dirty);
    this.dirty = DrawState.NONE;
    return result;
  }
}
