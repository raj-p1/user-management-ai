async function getUsers(signal) {
  const res = await fetch("https://dummyjson.com/users", {
    signal,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users.");
  }
  const data = await res.json();
  return data.users;
}

export default getUsers;
