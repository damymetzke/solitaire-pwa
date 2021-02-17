import { DrawState } from "../draw/drawState";
import Card from "../draw/card";
import CardCollection from "../draw/cardCollection";
import * as solitaire from "../solitaire/solitaire";

interface MoveCommand {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  length: number;
  card: Card;
  progress: number;
}

interface DropZone {
  x: number;
  y: number;
  width: number;
  height: number;
  stack: number;
}

function cardIdToIndex(cardId: string): number {
  const suit = cardId[0];
  const number = parseInt(cardId.slice(1));

  let offset = 0;
  switch (suit) {
    case "c":
      offset = -1;
      break;

    case "d":
      offset = 12;
      break;

    case "h":
      offset = 25;
      break;

    case "s":
      offset = 38;
      break;

    default:
      throw new Error(`CardID with invalid suit '${suit}'`);
  }

  return number + offset;
}

export default class StackHandler {
  moveCommands: MoveCommand[] = [];
  collection: CardCollection = null;
  dirty: DrawState = DrawState.NONE;
  dropZones: DropZone[] = [];

  constructor(
    game: string,
    cardBackImage: HTMLImageElement,
    cards: HTMLImageElement[]
  ) {
    const initialState = solitaire.init(game);
    const [stackState, cardState] = initialState.split(";");

    const numCards = stackState.split(",").map((value) => parseInt(value));

    this.collection = new CardCollection(numCards, cardBackImage);
    this.collection.forEachCard((card, index, stackIndex, cardIndex) => {
      const cardId = cardState.slice(3 * index, 3 * index + 3);
      const cardImageIndex = cardIdToIndex(cardId);
      card.image = cards[cardImageIndex % cards.length];
      const [homeX, homeY] = this.getHome(stackIndex, cardIndex);
      card.left = homeX;
      card.top = homeY;
    });
  }

  dropAt(x: number, y: number, source: [number, number]) {
    const dropTarget = this.dropZones.find((dropZone) => {
      return (
        x >= dropZone.x &&
        y >= dropZone.y &&
        x <= dropZone.x + dropZone.width &&
        y <= dropZone.y + dropZone.height
      );
    });
    if (dropTarget === undefined) {
      return;
    }

    const moves = this.attemptMove(source, dropTarget.stack);
    const individualMoves = moves.split(/[;/]/g);
    const actualMoves = individualMoves.filter((move) => {
      return move !== "" && move !== "~";
    });

    const shouldAnimate = new Set<string>();

    actualMoves.forEach((move) => {
      const [sourceStack, sourceCard, target] = move
        .split(/[,:]/g)
        .filter((part) => part !== "")
        .map((part) => parseInt(part));
      const sourcePattern = `${sourceStack},${sourceCard}`;
      if (shouldAnimate.has(sourcePattern)) {
        shouldAnimate.delete(sourcePattern);
      }

      shouldAnimate.add(`${target},${this.collection.cards[target].length}`);

      this.collection.cards[target].push(
        this.collection.cards[sourceStack][sourceCard]
      );

      for (
        let i = sourceCard + 1;
        i < this.collection.cards[sourceStack].length;
        ++i
      ) {
        this.collection.cards[sourceStack][i - 1] = this.collection.cards[
          sourceStack
        ][i];
        shouldAnimate.add(`${sourceStack},${i - 1}`);
      }

      this.collection.cards[sourceStack].pop();
    });
    shouldAnimate.forEach((animate) => {
      const [stackIndex, cardIndex] = animate
        .split(",")
        .map((value) => parseInt(value));
      this.moveToHome(stackIndex, cardIndex);
    });
  }

  attemptMove(source: [number, number], target: number): string {
    return solitaire.attemptMove(`${source[0]},${source[1]}:${target}`);
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
        command.progress + delta / command.length / 50,
        1
      );
      const smoothProgress = Math.max(
        0,
        Math.min(1, 3 * command.progress ** 2 - 2 * command.progress ** 3)
      );
      command.card.top =
        command.startY + smoothProgress * (command.endY - command.startY);
      command.card.left =
        command.startX + smoothProgress * (command.endX - command.startX);
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
