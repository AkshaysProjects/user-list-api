import { List, User } from "../models/index.js";
import parseCSV from "../services/csvService.js";

const addUsers = async (req, res) => {
  try {
    const { listId } = req.params;
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    const users = await parseCSV(req.file.path, list);

    const results = await Promise.allSettled(
      users.map(async (user) => {
        const existingUser = await User.findOne({
          email: user.email,
          list: listId,
        });
        if (existingUser) {
          return Promise.reject({
            data: user,
            message: "User already exists in the list",
          });
        }
        return new User({ ...user, list: listId }).save();
      })
    );

    const successfulResults = results.filter((r) => r.status === "fulfilled");
    const failedResults = results.filter((r) => r.status === "rejected");

    const successfulCount = successfulResults.length;
    const failedCount = failedResults.length;

    let errorCSV = null;

    if (failedCount > 0) {
      errorCSV = "name,email,error\n";
      failedResults.forEach((result) => {
        errorCSV += `${result.reason.data.name},${result.reason.data.email},${result.reason.message}\n`;
      });
    }

    res.status(200).json({
      added: successfulCount,
      failed: failedCount,
      total: await User.countDocuments({ list: listId }),
      errorCSV: errorCSV,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
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

export { addUsers, getUsers, getUserById };
