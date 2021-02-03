import Card from "./card";

import cardSrc from "../img/card.png";

const cardImg = new Image();
cardImg.src = cardSrc;

import cardBackSrc from "../img/card-back.png";

const cardBackImg = new Image();
cardBackImg.src = cardBackSrc;

let cardLoaded = false;
let cardBackLoaded = false;

const drawContext = (<HTMLCanvasElement>(
  document.getElementById("draw-target")
)).getContext("2d");

drawContext.imageSmoothingEnabled = false;

function onLoaded() {
  const collection = new CardCollection(20);

  collection.cards[4].isFront = false;
  collection.cards[8].isFront = false;
  collection.cards[16].isFront = false;

  collection.draw(drawContext);
}

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

  constructor(numCards: number) {
    this.cards = [];
    for (let i = 0; i < numCards; ++i) {
      this.cards.push({
        image: cardImg,
        isFront: true,
        left: 400 * i + 10,
        top: 10,
      });
    }
  }

  draw(context: CanvasRenderingContext2D) {
    this.cards.forEach((card) => {
      drawCard(context, {
        img: card.isFront ? card.image : cardBackImg,
        left: card.left,
        top: card.top,
        width: 350,
      });
    });
  }
}

cardImg.addEventListener(
  "load",
  () => {
    cardLoaded = true;
    if (cardBackLoaded) {
      onLoaded();
    }
  },
  false
);
cardBackImg.addEventListener(
  "load",
  () => {
    cardBackLoaded = true;
    if (cardLoaded) {
      onLoaded();
    }
  },
  false
);
