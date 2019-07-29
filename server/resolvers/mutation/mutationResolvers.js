const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Promise = require("bluebird");

var salt = bcrypt.genSaltSync(10);
module.exports = {
  Mutation: {
    async signup(parent, { signupInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const query = {
          text:
            "INSERT INTO users(name, password, email, location, date_of_birth) VALUES($1, $2, $3, $4, $5) RETURNING *",
          values: [
            signupInfo.name,
            bcrypt.hashSync(signupInfo.password, salt),
            signupInfo.email,
            signupInfo.location,
            signupInfo.date_of_birth
          ]
        };

        const result = await postgres.query(query);
        // console.log(result);
        const csrfTokenBinary = await Promise.promisify(crypto.randomBytes)(32);
        const csrfToken = Buffer.from(csrfTokenBinary, "binary").toString("base64");

        const jwtToken = authUtil.createToken(result.rows[0], app.get("JWT_SECRET"), csrfToken);

        authUtil.setCookie(app.get("JWT_COOKIE_NAME"), jwtToken, req.res);
        // =========================login=============================================================
        const user_id = result.rows[0].id;
        console.log(user_id);
        const queryLogin = {
          text: "UPDATE users SET status = 'online' WHERE id = $1 RETURNING *",
          values: [user_id]
        };

        const resultLogin = await postgres.query(queryLogin);

        return resultLogin.rows[0];
      } catch (error) {
        throw error;
      }
    },
    // This Resolver is great for testing purpose, but it can be refactored by the same way i did for the logout... :)
    async login(parent, { logInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const queryCheckUserName = {
          text: "SELECT * FROM users WHERE name = $1",
          values: [logInfo.name]
        };

        const resultCheckUserName = await postgres.query(queryCheckUserName);

        const isValid = bcrypt.compareSync(logInfo.password, resultCheckUserName.rows[0].password);

        if (isValid) {
          const queryCheckUserPwd = {
            text: "UPDATE users SET status = 'online' WHERE id = $1 RETURNING *",
            values: [resultCheckUserName.rows[0].id]
          };

          const resultCheckUserPwd = await postgres.query(queryCheckUserPwd);

          // =================Generate new Token and Cookie===============================
          const csrfTokenBinary = await Promise.promisify(crypto.randomBytes)(32);
          const csrfToken = Buffer.from(csrfTokenBinary, "binary").toString("base64");

          const jwtToken = authUtil.createToken(
            resultCheckUserPwd.rows[0],
            app.get("JWT_SECRET"),
            csrfToken
          );

          authUtil.setCookie(app.get("JWT_COOKIE_NAME"), jwtToken, req.res);

          return resultCheckUserPwd.rows[0];
        } else {
          console.log("Fail to authenticate");
        }
      } catch (error) {
        console.log(error.detail);
      }
    },
    async loginByEmail(parent, { logInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const query = {
          text:
            "UPDATE users SET status = 'online' FROM (SELECT id FROM users WHERE email = $1 and password = $2) AS T2 WHERE users.id = T2.id RETURNING *;",
          values: [logInfo.email, bcrypt.hashSync(logInfo.password, salt)]
        };
        const result = await postgres.query(query);
        return result.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    },
    async logoutExtended(parent, { logoutInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const query = {
          text:
            "UPDATE users SET status = 'inactive' FROM (SELECT id FROM users WHERE name = $1 and password = $2) AS T2 WHERE users.id = T2.id RETURNING *;",
          values: [logoutInfo.name, bcrypt.hashSync(logoutInfo.password, salt)]
        };
        const result = await postgres.query(query);
        return result.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    },
    async logout(parent, { logoutInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const query = {
          text: "UPDATE users SET status = 'inactive' WHERE id = $1 RETURNING *;",
          values: [logoutInfo.id]
        };
        const result = await postgres.query(query);
        return result.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    },
    async logoutAllUsers(parent, { logoutInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const query = {
          text: "UPDATE users SET status = 'inactive' RETURNING *;",
          values: []
        };
        const result = await postgres.query(query);
        return result.rows;
      } catch (error) {
        console.log(error.detail);
      }
    },
    async updateProfile(parent, { updateProfInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const query = {
          text:
            "UPDATE users SET name = $1, password = $2, location = $3, date_of_birth = $4 WHERE email = $5 RETURNING *;",
          values: [
            updateProfInfo.name,
            bcrypt.hashSync(updateProfInfo.password, salt),
            updateProfInfo.location,
            updateProfInfo.date_of_birth,
            updateProfInfo.email
          ]
        };
        const result = await postgres.query(query);
        return result.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    },
    //=======================================Items Resolvers ============================================
    async postItem(parent, { itemInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const owner_id = authUtil.authenticate(app, req);

        const query = {
          text:
            "INSERT into items (name, owner_id, description, quantity, duration) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          values: [
            itemInfo.name,
            // itemInfo.owner_id,
            owner_id,
            itemInfo.description,
            itemInfo.quantity,
            itemInfo.duration
          ]
        };
        const result = await postgres.query(query);
        return result.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    },
    async borrowItem(parent, { borrowInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const borrower_id = authUtil.authenticate(app, req);

        const query = {
          text: "UPDATE items SET status = 'borrowed', borrower_id = $2 WHERE id = $1 RETURNING *",
          values: [borrowInfo.id, borrower_id]
        };
        const result = await postgres.query(query);
        return result.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    },
    async returnItem(parent, { returnInfo }, { postgres, authUtil, app, req }, info) {
      try {
        const borrower_id = authUtil.authenticate(app, req);

        const query = {
          text:
            "UPDATE items SET status = 'available', borrower_id = null WHERE borrower_id = $2 and id = $1 RETURNING *",
          values: [returnInfo.id, borrower_id]
        };
        const result = await postgres.query(query);
        return result.rows[0];
      } catch (error) {
        console.log(error.detail);
      }
    }
  }
};

// const csrfTokenBinary = await Promise.promisify(crypto.randomBytes)(32)
//       const csrfToken = Buffer.from(csrfTokenBinary, "binary").toString(
//         "base64"
//       )

//       const jwtToken = authUtil.createToken(
//         signUpResult.rows[0],
//         app.get("JWT_SECRET"),
//         csrfToken
//       )

//       authUtil.setCookie(app.get("JWT_COOKIE_NAME"), jwtToken, req.res)

//Then into another resolver, like postItem, we need to get the userId like this:

//const owner_id = authUtil.authenticate(app, req);
