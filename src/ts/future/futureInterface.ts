import { Message } from "./message";

export class FutureInterface {
  worker: Worker;

  loaded: boolean;
  onLoaded: (self: this) => void = null;

  callId = 0;
  callReturns = new Map<number, (result: unknown) => void>();

  constructor() {
    this.loaded = false;
    this.worker = new Worker("./futureWorker.ts");
    this.worker.onmessage = (event: MessageEvent<Message>) => {
      switch (event.data.type) {
        case "loaded":
          this.loaded = true;
          if (this.onLoaded !== null) {
            this.onLoaded(this);
            this.onLoaded = null;
          }
          break;
        case "call-return":
          if (this.callReturns.has(event.data.id)) {
            this.callReturns.get(event.data.id)(event.data.result);
            this.callReturns.delete(event.data.id);
          }
          break;
        default:
          console.warn(
            `FutureInterface has recieved an unsupported message of type '${event.data.type}'.`
          );
      }
    };
  }

  call(functionName: string, args: unknown[]): Promise<unknown> {
    this.worker.postMessage(<Message>{
      type: "call",
      function: functionName,
      id: this.callId,
      arguments: args,
    });

    return new Promise<unknown>((resolve) => {
      this.callReturns.set(this.callId++, resolve);
    });
  }

  ping(): Promise<string> {
    return <Promise<string>>this.call("ping", []);
  }
}

export async function start(): Promise<FutureInterface> {
  const future = new FutureInterface();
  return new Promise<FutureInterface>((resolve) => {
    future.onLoaded = resolve;
  });
}
