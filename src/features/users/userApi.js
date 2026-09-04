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

async function addUser(userData) {
  const res = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    throw new Error("Failed to create user.");
  }
  return res.json();
}

async function updateUser(userData, id) {
  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    throw new Error("Failed to update user.");
  }
  return res.json();
}

async function deleteUser(id) {
  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete user.");
  }
  return res.json();
}

export { getUsers, addUser, updateUser, deleteUser };
