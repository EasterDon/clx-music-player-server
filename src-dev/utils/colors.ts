type ColorFn = (text: string) => string;

export const colorize: Record<string, ColorFn> = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  magenta: (text) => `\x1b[35m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,

  error: (text) => `\x1b[37m\x1b[41m${text}\x1b[0m`,
  success: (text) => `\x1b[30m\x1b[42m${text}\x1b[0m`,
  warning: (text) => `\x1b[30m\x1b[43m${text}\x1b[0m`,
  info: (text) => `\x1b[30m\x1b[46m${text}\x1b[0m`,
};
