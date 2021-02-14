import StackHandler from "./stackHandler";

export default class DisplayStackHandler extends StackHandler {
  constructor(cardBackImage: HTMLImageElement, cardImages: HTMLImageElement[]) {
    super([13, 13, 13, 14], cardBackImage);
    this.collection.forEachCard((card, index) => {
      card.isFront = index === 52 ? false : true;
      card.image = cardImages[index % cardImages.length];
      card.canDrag = true;
    });

    for (let i = 0; i < 4; ++i) {
      this.dropZones.push({
        x: 1 / 7,
        y: (8 / 7) * 1.5 * i + 1 / 7,
        width: 15,
        height: 1.5,
        stack: i,
      });
    }
  }

  getHome(stack: number, index: number): [number, number] {
    // last card is an exception as it is displayed on its back.
    if (stack === 3 && index === 13) {
      return [105 / 7, 1 / 7];
    }
    return [(8 / 7) * index + 1 / 7, (8 / 7) * stack * 1.5 + 1 / 7];
  }
}
