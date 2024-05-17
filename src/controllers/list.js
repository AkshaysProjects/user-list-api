import { List } from "../models/index.js";

const createList = async (req, res) => {
  try {
    const { title, properties } = req.body;

    const list = new List({ title, properties });
    await list.save();

    return res.status(201).json(list);
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An unexpected error occurred",
    });
  }
};

const getAllLists = async (_, res) => {
  try {
    const lists = await List.find().populate("users", "email");
    return res.status(200).json(lists);
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An unexpected error occurred",
    });
  }
};

const getListById = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findById(id);

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An unexpected error occurred",
    });
  }
};

const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, properties } = req.body;

    const list = await List.findByIdAndUpdate(
      id,
      { title, properties },
      { new: true }
    );

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An unexpected error occurred",
    });
  }
};

const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findByIdAndDelete(id);

    if (!list) {
      return res.status(404).end();
    }

    return res.status(204).json({ message: "List deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "An unexpected error occurred",
    });
  }
};

export { createList, getAllLists, getListById, updateList, deleteList };
