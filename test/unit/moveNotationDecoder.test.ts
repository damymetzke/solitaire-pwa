import MoveNotationDecoder from "../../src/ts/moveNotation/moveNotationDecoder";

test("Move notation decoder can handle modifiers, sources and targets", () => {
  const moveOnly = new MoveNotationDecoder("0,0:1", null);

  expect(moveOnly.moves).toStrictEqual([
    [
      {
        modifiers: {
          "*": false,
          "!": false,
          "?": false,
        },
        sourceStack: 0,
        sourceCard: 0,
        target: 1,
      },
    ],
  ]);
});
