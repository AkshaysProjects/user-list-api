import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  list: { type: Types.ObjectId, ref: "List", required: true },
  properties: { type: Map, of: String },
});

const User = model("User", userSchema);

export default User;
