const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const secret = process.env.SECRET;
  console.log(process.env.SECRET);

  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    secret,
    {
      expiresIn: "30d",
      algorithm: "HS256",
    }
  );
};

const isAuth = (req, res, next) => {
  const secret = process.env.SECRET;

  const { authorization } = req.headers;
  console.log("Token received in backend:", authorization);

  if (authorization) {
    // const token = authorization.slice(7, authorization.length);
    const token = authorization.split(" ")[1];

    jwt.verify(token, secret, (err, decode) => {
      if (err) {
        console.log("Error verifying token:", err); // Log error message
        res.status(401).send({ message: "Invalid Token" });
      } else {
        console.log("Decoded token:", decode); // Log decoded token
        req.user = decode;
        next();
      }
    });
  } else {
    console.log("No token received"); // Log no token received
    res.status(401).send({ message: "No Token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

// Mailgun related functions
const mg = require("mailgun-js");
const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

const payOrderEmailTemplate = (order) => {
  // Function implementation
};

module.exports = {
  generateToken,
  isAuth,
  isAdmin,
  mailgun,
  payOrderEmailTemplate,
};
