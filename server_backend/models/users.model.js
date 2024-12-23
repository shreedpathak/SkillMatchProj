import mongoose from "mongoose";

const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password:{
      type: String,
      required: [true, "Password is required"]
    },
    role: {
      type: String,
      enum: ["employee", "manager"],
      required: true,
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill", // Reference to Skill model
      },
    ],
    experience: [
      {
        projectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project", // Reference to Project model
          required: function () {
            return this.experience && this.experience.length > 0;
          },
        },
        role: {
          type: String,
          trim: true,
          required: function () {
            return this.experience && this.experience.length > 0;
          },
        },
        duration: {
          type: String,
          required: function () {
            return this.experience && this.experience.length > 0;
          },
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
