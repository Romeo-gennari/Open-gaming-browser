export default function notFoundHandler(err) {
  if (err.message.startsWith('nest expects'))
    return null;
  throw err;
}
