import MoveNotationDecoder from "../../src/ts/moveNotation/moveNotationDecoder";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toResolveToMoves: (
        expected: [[number, number], number, [boolean, boolean, boolean]][][]
      ) => CustomMatcherResult;
    }
  }
}
expect.extend({
  toResolveToMoves(
    recieved: unknown,
    expected: [[number, number], number, [boolean, boolean, boolean]][][]
  ): { pass: boolean; message: () => string } {
    if (typeof recieved !== "string") {
      return {
        pass: false,
        message: () => "Expected a string",
      };
    }

    const convertedExpected =
      expected?.map((move) => {
        return move.map((subMove) => {
          const [
            [sourceStack, sourceCard],
            target,
            [turnToFront, allowToMove, doNotAllowToMove],
          ] = subMove;
          return {
            modifiers: {
              turnToFront,
              allowToMove,
              doNotAllowToMove,
            },
            sourceStack,
            sourceCard,
            target,
          };
        });
      }) ?? null;

    const decoder = new MoveNotationDecoder(recieved, null);

    if (this.isNot) {
      expect(decoder.moves).not.toStrictEqual(convertedExpected);
    } else {
      expect(decoder.moves).toStrictEqual(convertedExpected);
    }

    return {
      pass: !this.isNot,
      message: () => "",
    };
  },
});

test("MoveNotationDecoder can handle modifiers, sources and targets.", () => {
  expect("0,0:1;").toResolveToMoves([[[[0, 0], 1, [false, false, false]]]]);
  expect("*!1,2;").toResolveToMoves([[[[1, 2], null, [true, true, false]]]]);
  expect("!5,3:4;").toResolveToMoves([[[[5, 3], 4, [false, true, false]]]]);
});

test("MoveNotationDecoder can handle null operations.", () => {
  expect("~;").toResolveToMoves(null);
  expect("~/~;~/~;").toResolveToMoves(null);
  expect("~/~;~/~/?1,2:4;").toResolveToMoves([
    [[[1, 2], 4, [false, false, true]]],
  ]);
});

test("MoveNotationDecoder can handle multiple inputs.", () => {
  expect("?1,3:9/*1,2;!2,2;").toResolveToMoves([
    [
      [[1, 3], 9, [false, false, true]],
      [[1, 2], null, [true, false, false]],
    ],
    [[[2, 2], null, [false, true, false]]],
  ]);
});
