import CardCollection from "../draw/cardCollection";

export default class MoveNotationDecoder {
  moves: any[][] = null;

  constructor(toDecode: string, collection: CardCollection) {
    this.moves = toDecode.split(";").map((move) => {
      return move.split("/").map((subMove) => {
        let currentlyParsing = subMove;
        const modifiers: Record<string, boolean> = {
          "*": false,
          "!": false,
          "?": false,
        };
        while (currentlyParsing[0] in modifiers) {
          modifiers[currentlyParsing[0]] = true;
          currentlyParsing = currentlyParsing.slice(1);
        }

        const [source, target] = currentlyParsing
          .split(":")
          .filter((value) => value !== "" && value !== "~");

        const [sourceStack, sourceCard] = source
          .split(",")
          .filter((value) => value !== "")
          .map((value) => parseInt(value));
        console.log(source, target, sourceStack, sourceCard);
        return {
          modifiers: modifiers,
          sourceStack: sourceStack,
          sourceCard: sourceCard,
          target: parseInt(target),
        };
      });
    });
  }
}
