import { Schema, Types, model } from "mongoose";

const customPropertySchema = new Schema({
  title: { type: String, required: true },
  fallback: { type: String, required: true },
});

const listSchema = new Schema({
  title: { type: String, required: true },
  properties: [customPropertySchema],
  users: [{ type: Types.ObjectId, ref: "User" }],
});

const List = model("List", listSchema);

export default List;
