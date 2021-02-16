import MoveNotationDecoder from "../../src/ts/moveNotation/moveNotationDecoder";

test("Move notation decoder can handle modifiers, sources and targets", () => {
  const moveOnly = new MoveNotationDecoder("0,0:1", null);
  const modifierOnly = new MoveNotationDecoder("*!1,2", null);
  const both = new MoveNotationDecoder("!5,3:4", null);

  expect(moveOnly.moves).toStrictEqual([
    [
      {
        modifiers: {
          turnToFront: false,
          allowToMove: false,
          doNotAllowToMove: false,
        },
        sourceStack: 0,
        sourceCard: 0,
        target: 1,
      },
    ],
  ]);

  expect(modifierOnly.moves).toStrictEqual([
    [
      {
        modifiers: {
          turnToFront: true,
          allowToMove: true,
          doNotAllowToMove: false,
        },
        sourceStack: 1,
        sourceCard: 2,
        target: null,
      },
    ],
  ]);

  expect(both.moves).toStrictEqual([
    [
      {
        modifiers: {
          turnToFront: false,
          allowToMove: true,
          doNotAllowToMove: false,
        },
        sourceStack: 5,
        sourceCard: 3,
        target: 4,
      },
    ],
  ]);
});
