const { getUserList, getUserListWithLocation } = require("../db/query/user");

module.exports = {
  Query: {
    async getUserList(root, args, context) {
      const { limit, offset } = args;
      let data = await getUserList(limit, offset);
      return data;
    },
    async findUsers(root, args, context) {
      const { limit, offset } = args;
      let data = await getUserListWithLocation();
      console.log("Data ::",data);
      return data;
    },
  },
};
