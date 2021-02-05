export default interface Card {
  image: HTMLImageElement;
  isFront: boolean;
  left: number;
  top: number;
  canDrag: boolean;
  isMoving: boolean;
}
