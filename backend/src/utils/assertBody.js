export default function assertBody(body, schema, res) {
  if (!body) {
    res.status(400).json({ message: 'Missing body' });
    return;
  }

  if (typeof body !== 'object') {
    res.status(400).json({ message: 'Body is not an object' });
    return;
  }

  try {
    return schema.parse(body);
  } catch (err) {
    res.status(400).json({ message: 'Invalid values', errors: err.issues });
    return;
  }
}
