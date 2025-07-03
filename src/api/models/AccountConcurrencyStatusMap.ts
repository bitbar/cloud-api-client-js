type ConcurrencyDetails = {
  accountConcurrency: number,
  runningSessions: number,
  sessions: number,
  unlimitedConcurrency: boolean,
  usedBy: Array<string>,
  waitingSessions: number
}

export type AccountConcurrencyStatusMap = {
  id: number;
  AUTOMATIC: ConcurrencyDetails,
  MANUAL: ConcurrencyDetails,
  DEDICATED: ConcurrencyDetails
}
