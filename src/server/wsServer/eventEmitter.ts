import EventEmitter from "events";

interface MyEvents {
  sendMessage: (data: { conversationId: string, userId: string }) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  emit<TEv extends keyof MyEvents>(
    event: TEv,
    ...args: Parameters<MyEvents[TEv]>
  ): boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class MyEventEmitter extends EventEmitter {}

// In a real app, you'd probably use Redis or something
export const ee = new MyEventEmitter();