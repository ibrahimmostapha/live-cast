const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Auth = require("../middleware/requireAuth");
const handleErrors = require("../controllers/handleErrorsController");


// get all users
const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({ error });
  }
};

// get one user
const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "No such user exists" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update user
const UpdateUser = async (req, res) => {
  const id = req.params.id;
  const userId = req.body;

  if (id === userId) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: id },
        {
          ...req.body, //spread the object,
        }
      );
      if (!user) {
        return res.status(400).json({ error: "No such user" });
      }
      console.log(user);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
};

// delete user
const DeleteUser = async (req, res) => {
  const id = req.params.id;
  const userId = req.body;

  try {
    await User.deleteOne({ _id: id, isSuper: false })
    res.status(200).json("User deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

// make admin
router.patch("/makeAdmin/:userId", Auth, async (req, res) => {
  try {
    const result = await User.updateOne(
      { _id: req.params.userId },
      { isAdmin: true }
    );
    res.status(200).json(result);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(401).json({ errors });
  }
}),

// remove admin
router.patch("/removeAdmin/:userId", Auth, async (req, res) => {
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.params.userId, isSuper: false },
      { isAdmin: false }
    );
    console.log(result)
    res.status(200).json(result);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(401).json({ errors });
  }
});


router.get("/single", Auth, async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json(req.user.isAdmin);
    } else {
      res.status(201).json(false);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// api search
router.get('/search', async (req, res) => {
  const { q } = req.query;
  try {
      let users = await User.find()
      res.json(search(users, q).slice(0, 20));
  } catch (error) {
      const errors = handleErrors(error);
      res.status(401).json({ errors });
  }
});

const keys = ["firstName", "lastName", "email"];

const search = (data, q) => {
  return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q))
  );
};



router.get("/all", Auth, getAllUsers);
router.get("/:id", Auth, getUser);
router.patch("/:id", Auth, UpdateUser);
router.delete("/:id", Auth, DeleteUser);

module.exports = router;
