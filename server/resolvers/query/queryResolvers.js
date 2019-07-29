const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Promise = require("bluebird");

var salt = bcrypt.genSaltSync(10);
module.exports = {
  Query: {
    async test(parent, args, context, info) {
      return "Hello World";
    },

    async getUserProfile(parent, { args }, { postgres, authUtil, app, req }, info) {
      const userId = authUtil.authenticate(app, req);

      try {
        const query = {
          text:
            "SELECT name, password, email, location, date_of_birth, status, date_created WHERE id = $1",
          values: [userId]
        };

        result = await postgres.query(query);
        return result.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    },

    async listMyItems(parent, args, { postgres, authUtil, app, req }, info) {
      const userId = authUtil.authenticate(app, req);
      console.log("User_ID:", userId);
      try {
        const query = {
          text: "SELECT * FROM items WHERE owner_id = $1",
          values: [userId]
        };

        result = await postgres.query(query);
        return result.rows;
      } catch (error) {
        console.log("error.detail", error);
      }
    },

    async listMyItemsByStatus(parent, { statusInfo }, { postgres, authUtil, app, req }, info) {
      const userId = authUtil.authenticate(app, req);

      try {
        const query = {
          text: "SELECT * FROM items WHERE owner_id = $1 AND status = $2",
          values: [userId, statusInfo]
        };

        result = await postgres.query(query);
        return result.rows;
      } catch (error) {
        console.log(error.detail);
      }
    },

    //=======================================Items Resolvers ============================================
    async listAllItems(parent, args, { postgres, authUtil, app, req }, info) {
      // const userId = authUtil.authenticate(app, req);
      // console.log(userId);
      try {
        const query = {
          text: "SELECT * FROM items"
        };
        const result = await postgres.query(query);
        return result.rows;
      } catch (e) {
        console.log(e.detail);
      }
    }
  }
};
