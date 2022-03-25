export default function safeUser(user) {
  return {
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    created_at: user.created_at,
  };
}
