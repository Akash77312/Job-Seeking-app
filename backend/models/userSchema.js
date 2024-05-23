import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    minlength: [3, "Name must contain at least 3 characters!"],
    maxlength: [30, "Name must contain leass than 30 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    validator: [validator.isEmail, "please provide your email"],
  },
  phone: {
    type: Number,
    required: [true, "Please Enter your number"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minlength: [5, "Name must contain at least 3 characters!"],
    maxlength: [10, "Name must contain leass than 30 characters!"],
  },
  role: {
    type: String,
    required: [true, "Please Enter yours role type"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    Date: Date,
    dafault: Date.now,
  },
});

//Hashing The password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
