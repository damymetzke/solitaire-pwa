import { coordinatesFromCard } from "./canvasManager";
import Card from "./card";

export interface CardRect {
  img: HTMLImageElement;
  top: number;
  left: number;
  width: number;
}

function drawCard(
  context: CanvasRenderingContext2D,
  { img, left, top, width }: CardRect
): void {
  context.fillStyle = "#0000ff";

  context.drawImage(img, left, top, width, width * 1.5);
}

export default class CardCollection {
  cards: Card[];

  cardBackImage: HTMLImageElement;

  constructor(numCards: number, cardBackImage: HTMLImageElement) {
    this.cardBackImage = cardBackImage;
    this.cards = [];
    for (let i = 0; i < numCards; ++i) {
      this.cards.push({
        image: cardBackImage,
        isFront: true,
        left: 0,
        top: 0,
        canDrag: false,
        isMoving: false,
      });
    }
  }

  static createIncremental(
    numCards: number,
    cardBackImage: HTMLImageElement,
    cardFrontImages: HTMLImageElement[]
  ): CardCollection {
    const result = new CardCollection(numCards, cardBackImage);

    for (let i = 0; i < numCards; ++i) {
      result.cards[i].image = cardFrontImages[i % cardFrontImages.length];
    }

    return result;
  }

  static createDisplay(
    cardBackImage: HTMLImageElement,
    cardFrontImages: HTMLImageElement[]
  ): CardCollection {
    const result = this.createIncremental(53, cardBackImage, cardFrontImages);
    result.cards.forEach((card, index) => {
      card.left = (8 / 7) * (index % 13) + 1 / 7;
      card.top = Math.floor(index / 13) * (8 / 7) * 1.5 + 1 / 7;
      card.canDrag = true;
    });

    result.cards[52].left = 105 / 7;
    result.cards[52].top = 1 / 7;

    return result;
  }

  /**
   * @deprecated use drawStatic instead
   */
  draw(context: CanvasRenderingContext2D): void {
    this.drawStatic(context);
  }

  /**
   * @deprecated use drawMove instead
   */
  drawDynamic(context: CanvasRenderingContext2D): void {
    this.drawMove(context);
  }

  drawStatic(context: CanvasRenderingContext2D): void {
    this.cards.forEach((card) => {
      if (card.isMoving) {
        return;
      }
      const [canvasWidth] = coordinatesFromCard(1, 1).toCanvas();
      const [canvasX, canvasY] = coordinatesFromCard(
        card.left,
        card.top
      ).toCanvas();
      drawCard(context, {
        img: card.isFront ? card.image : this.cardBackImage,
        left: canvasX,
        top: canvasY,
        width: canvasWidth,
      });
    });
  }

  drawMove(context: CanvasRenderingContext2D): void {
    this.cards.forEach((card) => {
      if (!card.isMoving) {
        return;
      }
      const [canvasWidth] = coordinatesFromCard(1, 1).toCanvas();
      const [canvasX, canvasY] = coordinatesFromCard(
        card.left,
        card.top
      ).toCanvas();
      drawCard(context, {
        img: card.isFront ? card.image : this.cardBackImage,
        left: canvasX,
        top: canvasY,
        width: canvasWidth,
      });
    });
  }
}
