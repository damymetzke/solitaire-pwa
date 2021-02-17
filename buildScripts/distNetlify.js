const { spawn } = require("child_process");
const { promises: fs } = require("fs");

function runCommand(command, args, cwd = ".") {
  const commandName = args.reduce((total, current) => {
    return `${total} ${current}`;
  }, command);

  return new Promise((resolve, reject) => {
    console.log(`Running command:\n${commandName}\n`);
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
      console.log(`Finished running command:\n${commandName}\n`);
      resolve();
    });
  });
}

async function run() {
  try {
    console.time("deploy-time");
    try {
      await fs.stat("./emsdk");
    } catch (_error) {
      await runCommand("git", [
        "clone",
        "https://github.com/emscripten-core/emsdk.git",
      ]);
    } finally {
      await runCommand("git", ["pull"], "./emsdk");
    }
    await runCommand("./emsdk", ["install", "latest"], "./emsdk");
    await runCommand("./emsdk", ["activate", "latest"], "./emsdk");
    await runCommand("pip", ["install", "cmake"]);
    await runCommand("npm", ["run", "setup-cmake"]);
    await runCommand("npm", ["run", "build-cmake"]);
    await runCommand("npm", ["run", "dist"]);
  } catch (error) {
    console.error(`Script failed because:\n${error}`);
  } finally {
    console.timeEnd("deploy-time");
  }
}

run();
