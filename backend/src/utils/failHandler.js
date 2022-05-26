module.exports = function failHandler(res) {
  return () => {
    res.status(500).json({ message: 'Internal server error' });
    return false;
  }
}
