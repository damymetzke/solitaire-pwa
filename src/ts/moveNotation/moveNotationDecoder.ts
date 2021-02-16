import CardCollection from "../draw/cardCollection";

export default class MoveNotationDecoder {
  constructor(toDecode: string, collection: CardCollection) {
    const moves = toDecode.split(";").map((move) => {
      const subMoves = move.split("/").map((subMove) => {
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

        const [sourceStack, sourceCard] = source;

        return {
          modifiers: modifiers,
          sourceStack: sourceStack,
          sourceCard: sourceCard,
          target: target,
        };
      });
    });
  }
}
