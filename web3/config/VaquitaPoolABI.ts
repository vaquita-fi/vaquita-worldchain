// Vaquita Pool Application Binary Interface

const VAQUITA_POOL_ABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_token", type: "address", internalType: "address" },
      { name: "_aavePool", type: "address", internalType: "address" },
      { name: "_aToken", type: "address", internalType: "address" },
      { name: "_lockPeriod", type: "uint256", internalType: "uint256" }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "BASIS_POINTS",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "aToken",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IAToken" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "aavePool",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IPool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "addRewards",
    inputs: [{ name: "rewardAmount", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "deposit",
    inputs: [
      { name: "depositId", type: "bytes32", internalType: "bytes32" },
      { name: "amount", type: "uint256", internalType: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "earlyWithdrawalFee",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "emergencyWithdraw",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "getPosition",
    inputs: [{ name: "depositId", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      { name: "positionOwner", type: "address", internalType: "address" },
      { name: "positionAmount", type: "uint256", internalType: "uint256" },
      { name: "entryTime", type: "uint256", internalType: "uint256" },
      { name: "finalizationTime", type: "uint256", internalType: "uint256" },
      { name: "positionIsActive", type: "bool", internalType: "bool" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getRewardPoolDistribution",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "lockPeriod",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "positions",
    inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      { name: "id", type: "bytes32", internalType: "bytes32" },
      { name: "owner", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "entryTime", type: "uint256", internalType: "uint256" },
      { name: "finalizationTime", type: "uint256", internalType: "uint256" },
      { name: "isActive", type: "bool", internalType: "bool" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "protocolFees",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "rewardPool",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "token",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IERC20" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "totalDeposits",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "updateEarlyWithdrawalFee",
    inputs: [{ name: "newFee", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "updateLockPeriod",
    inputs: [{ name: "newLockPeriod", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "updateProtocolFees",
    inputs: [{ name: "newProtocolFees", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "userTotalDeposits",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [{ name: "depositId", type: "bytes32", internalType: "bytes32" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "withdrawProtocolFees",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "withdrawRewardPool",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "event",
    name: "EarlyWithdrawalFeeUpdated",
    inputs: [{ name: "newFee", type: "uint256", indexed: false, internalType: "uint256" }],
    anonymous: false
  },
  {
    type: "event",
    name: "EmergencyWithdrawal",
    inputs: [
      { name: "owner", type: "address", indexed: true, internalType: "address" },
      { name: "amount", type: "uint256", indexed: false, internalType: "uint256" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "FundsDeposited",
    inputs: [
      { name: "depositId", type: "bytes32", indexed: true, internalType: "bytes32" },
      { name: "owner", type: "address", indexed: true, internalType: "address" },
      { name: "amount", type: "uint256", indexed: false, internalType: "uint256" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "FundsWithdrawn",
    inputs: [
      { name: "depositId", type: "bytes32", indexed: true, internalType: "bytes32" },
      { name: "owner", type: "address", indexed: true, internalType: "address" },
      { name: "amount", type: "uint256", indexed: false, internalType: "uint256" },
      { name: "reward", type: "uint256", indexed: false, internalType: "uint256" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "LockPeriodUpdated",
    inputs: [{ name: "newLockPeriod", type: "uint256", indexed: false, internalType: "uint256" }],
    anonymous: false
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      { name: "previousOwner", type: "address", indexed: true, internalType: "address" },
      { name: "newOwner", type: "address", indexed: true, internalType: "address" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "RewardDistributed",
    inputs: [
      { name: "depositId", type: "bytes32", indexed: true, internalType: "bytes32" },
      { name: "owner", type: "address", indexed: true, internalType: "address" },
      { name: "reward", type: "uint256", indexed: false, internalType: "uint256" }
    ],
    anonymous: false
  },
  {
    type: "error",
    name: "InvalidAddress",
    inputs: []
  },
  {
    type: "error",
    name: "InvalidAmount",
    inputs: []
  },
  {
    type: "error",
    name: "InvalidDepositId",
    inputs: []
  },
  {
    type: "error",
    name: "InvalidFee",
    inputs: []
  },
  {
    type: "error",
    name: "NotPositionOwner",
    inputs: []
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }]
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }]
  },
  {
    type: "error",
    name: "PositionAlreadyWithdrawn",
    inputs: []
  },
  {
    type: "error",
    name: "PositionNotFound",
    inputs: []
  },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [{ name: "token", type: "address", internalType: "address" }]
  },
  {
    type: "error",
    name: "WithdrawalTooEarly",
    inputs: []
  }
] as const;

export default VAQUITA_POOL_ABI;
