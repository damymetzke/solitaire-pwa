import MoveNotationDecoder from "../../src/ts/moveNotation/moveNotationDecoder";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toResolveToMoves: (
        [sourceStack, sourceCard]: [number, number],
        target: number,
        modifiers: [boolean, boolean, boolean]
      ) => CustomMatcherResult;
    }
  }
}
expect.extend({
  toResolveToMoves(
    recieved: unknown,
    [sourceStack, sourceCard]: [number, number],
    target: number,
    modifiers: [boolean, boolean, boolean]
  ): { pass: boolean; message: () => string } {
    if (typeof recieved !== "string") {
      return {
        pass: false,
        message: () => "Expected a string",
      };
    }

    const decoder = new MoveNotationDecoder(recieved, null);
    const expectedObject = {
      modifiers: {
        turnToFront: modifiers[0],
        allowToMove: modifiers[1],
        doNotAllowToMove: modifiers[2],
      },
      sourceStack: sourceStack,
      sourceCard: sourceCard,
      target: target,
    };

    if (this.isNot) {
      expect(decoder.moves).not.toStrictEqual([[expectedObject]]);
    } else {
      expect(decoder.moves).toStrictEqual([[expectedObject]]);
    }

    return {
      pass: !this.isNot,
      message: () => "",
    };
  },
});

test("Move notation decoder can handle modifiers, sources and targets", () => {
  expect("0,0:1;").toResolveToMoves([0, 0], 1, [false, false, false]);
  expect("*!1,2;").toResolveToMoves([1, 2], null, [true, true, false]);
  expect("!5,3:4;").toResolveToMoves([5, 3], 4, [false, true, false]);
});
