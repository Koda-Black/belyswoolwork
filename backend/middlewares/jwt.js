const expressJwt = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET;

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] }, // prettier-ignore
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] }, // prettier-ignore
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] }, // prettier-ignore

      "/api/v1/users/login",
      "/api/v1/users/signup",
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;
