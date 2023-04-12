const app = (module.exports = require("express")());

const { sendResponse } = require("../util/response");
const { default: statusCode } = require("../statusCode");
const { getUserList } = require("../db/query/user");

app.get("/", async (req, res) => {
  try {
    let data = await getUserList();
    return sendResponse(res, statusCode.SUCCESS, { msg: "User List", data });
  } catch (err) {
    console.log("Error came", err);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, { msg: err });
  }
});
