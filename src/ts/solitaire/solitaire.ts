import wasmModule from "../../cpp/wasm/wasm.cpp";

let onLoaded: () => void = null;

let isLoaded = false;

let wasmInstance;

wasmModule().then((instance) => {
  if (onLoaded !== null) {
    onLoaded();
  }

  onLoaded = null;
  isLoaded = true;
  wasmInstance = instance;
});

export async function waitUntilLoaded(): Promise<void> {
  return new Promise<void>((resolve) => {
    if (isLoaded) {
      resolve();
      return;
    }

    onLoaded = resolve;
  });
}

function instanceValid(name: string) {
  if (wasmInstance === undefined) {
    throw new Error(
      `solitaire function '${name}' was called, but wasm has not been loaded yet.`
    );
  }
}

export function ping(): string {
  instanceValid("ping");
  return wasmInstance.ccall("ping", "string", [], []);
}

export function init(game: string): string {
  instanceValid("init");
  return wasmInstance.ccall("init", "string", ["string"], [game]);
}

export function reset(): void {
  instanceValid("reset");
  wasmInstance.ccall("reset", "number", [], []);
}

export function attemptMove(move: string): string {
  instanceValid("attemptMove");
  return wasmInstance.ccall("attemptMove", "string", ["string"], [move]);
}
