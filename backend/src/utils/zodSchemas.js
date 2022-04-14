import { z } from 'zod';

const iso8601Regex = /^\d{4}[-/](?:0\d|1[0-2])[-/](?:[0-2]\d|3[01])$/iu;
function isISO8601(value) {
  return iso8601Regex.test(value);
}

export const dateSchema = z.preprocess((arg) => {
  if (arg instanceof Date)
    return arg;
  if (typeof arg == 'string' && isISO8601(arg))
    return new Date(arg);
}, z.date());
