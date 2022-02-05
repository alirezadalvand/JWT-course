const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      error: [
        {
          msg: "No token found",
        },
      ],
    });
  }

  try {
    const user = await JWT.verify(token, process.env.jwtSecret);
    req.user = user.email;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
