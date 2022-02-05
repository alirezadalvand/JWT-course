const router = require("express").Router();
const { publicPost, privatePost } = require("../db");
const auth = require("../middleware/auth");

router.get("/public", async (req, res) => {
  res.json(publicPost);
});

router.get("/private", auth, async (req, res) => {
  res.json(privatePost);
});

module.exports = router;
