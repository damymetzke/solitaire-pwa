interface LoadedMessage {
  type: "loaded";
}

interface CallMessage {
  type: "call";
  function: string;
  id: number;
  arguments: unknown[];
}

interface CallReturnMessage {
  type: "call-return";
  id: number;
  result: unknown;
}

export type Message = LoadedMessage | CallMessage | CallReturnMessage;
