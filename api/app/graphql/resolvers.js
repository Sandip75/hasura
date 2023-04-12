const { getUserList } = require("../db/query/user");

module.exports = {
  Query: {
    async getUserList(root, args, context) {
      const { limit, offset } = args;
      let data = await getUserList(limit, offset);
      return data;
    },
  },
};
