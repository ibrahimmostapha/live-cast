const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //hashing function
const validator = require("validator");
const subSchema = require("./subscription");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  plan: {
    type: subSchema,
    strict: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isSuper: {
    type: Boolean,
    default: false,
  },
});

UserSchema.statics.signup = async function (
  email,
  firstName,
  lastName,
  password
) {
  //needs to be a regular function to use this.
  console.log(email, firstName, lastName, password);
  // validation
  if (!email || !password || !firstName || !lastName) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    firstName,
    lastName,
    password: hash,
  });

  return user;
};

// static login method
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
