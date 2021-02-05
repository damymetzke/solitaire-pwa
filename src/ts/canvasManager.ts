const canvasElement = <HTMLCanvasElement>document.getElementById("draw-target");

const WIDTH_IN_CARD_SPACE = 17;
const HEIGHT_IN_CARD_SPACE =
  (WIDTH_IN_CARD_SPACE / canvasElement.width) * canvasElement.height;

class CoordinateConverter {
  normalizedX: number;
  normalizedY: number;

  constructor(normalizedX: number, normalizedY: number) {
    this.normalizedX = normalizedX;
    this.normalizedY = normalizedY;
  }

  toScreen(): [number, number] {
    return [
      this.normalizedX * canvasElement.offsetWidth,
      this.normalizedY * canvasElement.offsetHeight,
    ];
  }

  toCanvas(): [number, number] {
    return [
      this.normalizedX * canvasElement.width,
      this.normalizedY * canvasElement.height,
    ];
  }

  toCard(): [number, number] {
    return [
      this.normalizedX * WIDTH_IN_CARD_SPACE,
      this.normalizedY * HEIGHT_IN_CARD_SPACE,
    ];
  }
}

export function coordinatesFromScreen(
  screenX: number,
  screenY: number
): CoordinateConverter {
  return new CoordinateConverter(
    screenX / canvasElement.offsetWidth,
    screenY / canvasElement.offsetHeight
  );
}

export function coordinatesFromCanvas(
  canvasX: number,
  canvasY: number
): CoordinateConverter {
  return new CoordinateConverter(
    canvasX / canvasElement.width,
    canvasY / canvasElement.height
  );
}

export function coordinatesFromCard(
  cardX: number,
  cardY: number
): CoordinateConverter {
  return new CoordinateConverter(
    cardX / WIDTH_IN_CARD_SPACE,
    cardY / HEIGHT_IN_CARD_SPACE
  );
}
