const { exec } = require("child_process");

function runCommand(command) {
  return new Promise((resolve) => {
    const childProcess = exec(command);
    childProcess.on("exit", () => {
      resolve();
    });
  });
}

async function run() {
  await runCommand("git clone https://github.com/emscripten-core/emsdk.git");
  await runCommand("cd emsdk");
  await runCommand("./emsdk install latest");
  await runCommand("./emsdk activate latest");
  await runCommand("source ./emsdk_env.sh");
  await runCommand("npm run dist");
}

run();
