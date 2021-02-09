const { spawn } = require("child_process");

function runCommand(command, args, cwd = ".") {
  return new Promise((resolve, reject) => {
    console.log(`running command ${command}`);
    const childProcess = spawn(command, args, {
      cwd: cwd,
      env: {
        PATH: `${
          process.env.PATH
        }:${process.cwd()}/emsdk:${process.cwd()}/emsdk/upstream/emscripten`,
      },
    });
    childProcess.stdout.on("data", (data) => {
      console.log(data.toString());
    });
    childProcess.stderr.on("data", (data) => {
      console.error(data.toString());
    });
    childProcess.on("exit", (error) => {
      if (error) {
        reject(error);
        return;
      }
      console.log(`done with ${command}`);
      resolve();
    });
  });
}

async function run() {
  try {
    console.time("running");
    await runCommand("git", [
      "clone",
      "https://github.com/emscripten-core/emsdk.git",
    ]);
    await runCommand("./emsdk", ["install", "latest"], "./emsdk");
    await runCommand("./emsdk", ["activate", "latest"], "./emsdk");
    await runCommand("apt-get", ["install", "cmake"]);
    await runCommand("npm", ["run", "setup-cmake"]);
    await runCommand("npm", ["run", "build-cmake"]);
    await runCommand("npm", ["run", "dist"]);
  } catch (error) {
    console.error(`Script failed because:\n${error}`);
  } finally {
    console.timeEnd("running");
  }
}

run();
