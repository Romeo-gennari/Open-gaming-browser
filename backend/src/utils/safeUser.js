export default function safeUser(user) {
  return {
    username: user.username,
    email: user.email,
    created_at: user.created_at,
  };
}
