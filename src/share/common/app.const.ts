export const COMMON_CONST = {
  PAGE_SIZE: 20,
  BCRYPT_HASH_ROUND: 12,
  UNIT_BILLION: 1000000000,
};

export const OTP_CONST = {
  LENGTH: 6,
  EFFECTIVE_TIME: 1 * 60000, // 300 second
  TIMES_LIMIT: 5,
  ONE_DAY: 24 * 60 * 60000,
  BLOCK_DURATIONS: 24 * 60 * 60000, // 24 hours
};

export const PERMISSION_METADATA = 'permissions';
