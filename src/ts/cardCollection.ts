import Card from "./card";
import { loadCards } from "./loadCard";

const drawContext = (<HTMLCanvasElement>(
  document.getElementById("draw-target")
)).getContext("2d");

drawContext.imageSmoothingEnabled = false;

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
        left: 400 * (i % 13) + 10,
        top: Math.floor(i / 13) * 600 + 10,
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

  draw(context: CanvasRenderingContext2D) {
    this.cards.forEach((card) => {
      drawCard(context, {
        img: card.isFront ? card.image : this.cardBackImage,
        left: card.left,
        top: card.top,
        width: 350,
      });
    });
  }
}

async function run() {
  const [card, cardBack] = await loadCards([
    (await import("../img/card.png")).default,
    (await import("../img/card-back.png")).default,
  ]);

  const collection = CardCollection.createIncremental(53, cardBack, [card]);

  collection.cards[52].isFront = false;

  collection.draw(drawContext);
}

run();
