const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();

router.post(
  "/signup",

  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").exists().isLength({ min: 6 }),
  ],

  async (req, res) => {
    //* validate input user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    //*validate if user doesn't exist

    let user = users.find((user) => {
      return user.email === email;
    });

    if (user) {
      return res.status(400).send({ massage: "this user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      email,
      password: hashedPassword,
    });

    const token = await JWT.sign({ email }, process.env.jwtSecret);

    res.json({ token });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = users.find((user) => {
    return user.email === email;
  });

  if (!user) {
    return res.status(400).send({ massage: "Invalid Credentional" });
  }

  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).send({ massage: "Invalid Credentional" });
  }

  const token = await JWT.sign({ email }, process.env.jwtSecret);

  res.json({ token });
});

router.get("/all", (req, res) => {
  res.json(users);
});

module.exports = router;
