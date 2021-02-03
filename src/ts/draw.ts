const drawContext = (<HTMLCanvasElement>(
  document.getElementById("draw-target")
)).getContext("2d");

drawContext.imageSmoothingEnabled = false;

import cardSrc from "../img/card.png";

const cardImg = new Image();
cardImg.src = cardSrc;

import cardBackSrc from "../img/card-back.png";

const cardBackImg = new Image();
cardBackImg.src = cardBackSrc;

export interface CardRect {
  img: HTMLImageElement;
  top: number;
  left: number;
  width: number;
}

export function drawCard(dimensions: CardRect): void {
  drawContext.fillStyle = "#0000ff";

  drawContext.drawImage(
    dimensions.img,
    dimensions.left,
    dimensions.top,
    dimensions.width,
    dimensions.width * 1.5
  );
}

let cardLoaded = false;
let cardBackLoaded = false;

function onLoaded() {
  drawCard({
    img: cardImg,
    top: 1000,
    left: 1000,
    width: 1000,
  });
  drawCard({
    img: cardBackImg,
    top: 1000,
    left: 2100,
    width: 1000,
  });
  drawCard({
    img: cardImg,
    top: 1000,
    left: 3200,
    width: 1000,
  });
  drawCard({
    img: cardBackImg,
    top: 1000,
    left: 4300,
    width: 1000,
  });
  drawCard({
    img: cardImg,
    top: 1000,
    left: 5400,
    width: 1000,
  });
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
