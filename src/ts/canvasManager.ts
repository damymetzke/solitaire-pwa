const canvasElement = <HTMLCanvasElement>document.getElementById("draw-target");

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
