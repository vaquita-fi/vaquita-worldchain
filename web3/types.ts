
export type SuccessTransaction = {
  success: true,
  transactionHash: `0x${string}`,
  receipt: object,
  error: null,
}

export type ErrorTransaction = {
  success: false,
  transactionHash: null,
  receipt: null,
  error: Error,
}

export type Transaction = SuccessTransaction | ErrorTransaction;
