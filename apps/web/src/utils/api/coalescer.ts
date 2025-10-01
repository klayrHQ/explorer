import { ReqoalInstance } from 'reqoal';

const DEFAULT_PRUNE_INTERVAL_MS = 60000;
const DEFAULT_TTL_MS = 1000;
const logger = {
  log: () => {},
  warn: () => {},
  error: () => {},
  info: () => {},
  debug: () => {},
  trace: () => {},
  group: () => {},
  groupEnd: () => {},
  groupCollapsed: () => {},
  table: () => {},
  dir: () => {},
  dirxml: () => {},
  count: () => {},
  countReset: () => {},
  assert: () => {},
  profile: () => {},
  profileEnd: () => {},
  time: () => {},
  timeEnd: () => {},
  timeLog: () => {},
  timeStamp: () => {},
  clear: () => {},
};

export class Coalescer {
  static coalescer?: ReqoalInstance;

  public static getInstance(): ReqoalInstance {
    if (!Coalescer.coalescer) {
      Coalescer.coalescer = new ReqoalInstance(
        DEFAULT_PRUNE_INTERVAL_MS,
        DEFAULT_TTL_MS,
        logger as any,
      );
    }
    return Coalescer.coalescer;
  }
}
