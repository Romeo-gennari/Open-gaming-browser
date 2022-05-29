module.exports = function safeUser(user) {
  return {
    username: user.username,
    email: user.email,
    avatar_url: user.avatar_url,
    description: user.description,
    created_at: user.created_at,
  };
}
