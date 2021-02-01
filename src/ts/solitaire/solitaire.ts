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

export function ping(): string {
  return wasmInstance.ccall("ping", "string", [], []);
}
