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

  constructor(
    numCards: number,
    cardImage: HTMLImageElement,
    cardBackImage: HTMLImageElement
  ) {
    this.cardBackImage = cardBackImage;
    this.cards = [];
    for (let i = 0; i < numCards; ++i) {
      this.cards.push({
        image: cardImage,
        isFront: true,
        left: 400 * i + 10,
        top: 10,
      });
    }
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
    import("../img/card.png"),
    import("../img/card-back.png"),
  ]);

  const collection = new CardCollection(20, card, cardBack);

  collection.cards[4].isFront = false;
  collection.cards[8].isFront = false;
  collection.cards[16].isFront = false;

  collection.draw(drawContext);
}

run();
