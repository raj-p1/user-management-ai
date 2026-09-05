import User from "../models/User.js";

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({
      message: "Failed to fetch users.",
    });
  }
}

async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch {
    res.status(500).json({
      message: "Failed to add user.",
    });
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(user);
  } catch {
    res.status(500).json({
      message: "Failed to update user.",
    });
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(user);
  } catch {
    res.status(500).json({
      message: "Failed to delete user.",
    });
  }
}

export { getUsers, createUser, updateUser, deleteUser };
