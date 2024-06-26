import { List, User } from "../models/index.js";
import parseCSV from "../services/csvService.js";
import { addMessage } from "../utils/messageQueue.js";

const addUsers = async (req, res) => {
  try {
    const { listId } = req.params;
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    const users = await parseCSV(req.file.path, list);
    const emailSet = new Set();
    const uniqueUsers = [];
    const duplicates = [];

    for (const user of users) {
      const { email } = user;
      if (!emailSet.has(email)) {
        emailSet.add(email);
        uniqueUsers.push(user);
      } else {
        duplicates.push(user);
      }
    }

    const existingUsers = await User.find({ list: listId }, "email");
    const newUsers = uniqueUsers.filter(
      (user) => !existingUsers.some((u) => u.email === user.email)
    );

    await User.insertMany(
      newUsers.map((user) => ({ ...user, list: listId })),
      { ordered: false }
    );
    newUsers.forEach((user) => {
      const unsubscribeLink = `${process.env.BASE_URL}/api/lists/${listId}/users/unsubscribe?email=${user.email}`;
      addMessage({
        name: user.name,
        email: user.email,
        city: user.properties.city,
        unsubscribeLink,
      });
    });

    let errorCSV = null;
    const failedInserts = duplicates.concat(existingUsers);

    if (failedInserts.length > 0) {
      errorCSV = "name,email,error\n";
      failedInserts.forEach((user) => {
        errorCSV += `${user.name},${user.email},Duplicate email\n`;
      });
    }

    const successfulInserts = newUsers.length;

    return res.status(200).json({
      added: successfulInserts,
      failed: failedInserts.length,
      total: await User.countDocuments({ list: listId }),
      errorCSV: errorCSV,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users in a list
const getUsers = async (req, res) => {
  try {
    const { listId } = req.params;
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    const users = await User.find({ list: listId });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const { listId, userId } = req.params;
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const { listId, userId } = req.params;
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Unsubscribe a user
const unsubscribeUser = async (req, res) => {
  try {
    const { listId } = req.params;
    const { email } = req.query;
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    const user = await User.findOneAndDelete({ email, list: listId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User unsubscribed" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export { addUsers, getUsers, getUserById, deleteUserById, unsubscribeUser };
