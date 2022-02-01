const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "TOPSECRET";

//Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter the valid name").isLength({ min: 3 }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter the valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Check whether the user with this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already exist!" });
      }
      //Create hash and salt for password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server ERROR!");
    }
  }
);
//Authenticate a User using: POST "/api/auth/login".
router.post(
  "/login",
  [
    body("email", "Enter the valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Credentials are not correct!" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Credentials are not correct!" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server ERROR!");
    }
  }
);

module.exports = router;
