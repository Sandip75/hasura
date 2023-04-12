const app = (module.exports = require("express")());
const jwt = require("jwt-simple");

const { sendResponse } = require("../util/response");
const { default: statusCode } = require("../statusCode");
const { getUserList } = require("../db/query/user");

const { hasura } = require("config");

app.get("/", async (req, res) => {
  try {
    let data = await getUserList();
    return sendResponse(res, statusCode.SUCCESS, { msg: "User List", data });
  } catch (err) {
    console.log("Error came", err);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, { msg: err });
  }
});

app.get("/token", async (req, res) => {
  try {
    let data = await getUserList(1, 0);
    let user = data[0];

    const secret = hasura.jwtSecret.key;

    const claims = {
      user,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": user.id,
      },
    };

    let token = {
      token: jwt.encode(claims, secret),
      user,
    };

    return sendResponse(res, statusCode.SUCCESS, { msg: "User Token", token });
  } catch (err) {
    console.log("Error came", err);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, { msg: err });
  }
});
