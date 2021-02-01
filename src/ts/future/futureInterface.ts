export class FutureInterface {
  worker: Worker;

  constructor() {
    this.worker = new Worker("./futureWorker.ts");
  }
}

export async function start(): Promise<FutureInterface> {
  const future = new FutureInterface();
  return new Promise<FutureInterface>((resolve) => {
    future.worker.onmessage = (event) => {
      if (event.data.type !== "loaded") {
        return;
      }

      resolve(future);
    };
  });
}
