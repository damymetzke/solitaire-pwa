import wasmModule from "../../cpp/wasm/wasm.cpp";

wasmModule().then((wasmInstance) => {
  console.log(wasmInstance.ccall("ping", "string", [], []));
});
