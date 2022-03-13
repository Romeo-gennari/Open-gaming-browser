export default function duplicateHandler(message, res) {
  return function (err) {
    // pg: 23505, mysql: ER_DUP_ENTRY
    if (err.code === '23505') {
      res.status(401).json({ message });
      return;
    }
    res.status(500).json({ message: 'Internal server error' });
    return false;
  }
}
