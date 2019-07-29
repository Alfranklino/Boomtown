// This line is an import -> import from the pg.js file which is inside the node_modules dir. If this file wasn't there we would need to use a relative path.
//const signup = async function(input) { --This line is basically the same for the next one.
const signup = async (input) => {
  try {
    const query = {
      text: "INSERT INTO users(name, password) VALUES($1, $2) RETURNING *",
      values: [input.name, bcrypt.hashSync(input.password, salt)]
    };

    const result = await pool.query(query);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const login = async input => {
  try {
    const queryCheckUserName = {
      text: "SELECT * FROM users WHERE name = $1",
      values: [input.name]
    };

    const resultCheckUserName = await pool.query(queryCheckUserName);

    
    const isValid = bcrypt.compareSync(input.password, resultCheckUserName.rows[0].password);
    
    if (isValid) {
      const queryCheckUserPwd = {
        text: "UPDATE users SET status = 'online' WHERE id = $1 RETURNING *",
        values: [resultCheckUserName.rows[0].id]
      };

      const resultCheckUserPwd = await pool.query(queryCheckUserPwd);

      return resultCheckUserPwd.rows[0];
    } else {
      console.log("Fail to authenticate");
    }
  } catch (error) {
    console.log(error.detail);
  }
};

//login
//logout
//getUserProfile
//updateUserProfile
//postItem
//getItem
//listAllUserItems
//getAllUserItems
//getAllItems


const logout = (input) => { 
  try {
     const query = {
    text: "UPDATE users SET status = 'inactive' where id = $1",
    values: [input.id]
  };
  const result = await pool.query(query);
  return result.rows[0];
  } catch (error) {
    console.log(error.detail);
  }
  
};

const getUserProfile = async(input) => {

try {
  const query = {
    text= "SELECT * FROM users WHERE id = $1",
    values = [input.id]
  };
  const result = await pool.query(query);
  return result.rows[0];
} catch (error) {
  console.log(error.detail)
} 
};
// const updateUserProfile = function(input) {
//   console.log(input);
//   const query = {
//     text: "UPDATE users SET " + input.col + " =  $1  where id = $2",
//     values: [input.val, input.id]
//   };
//   return new Promise((resolve, reject) => {
//     pool
//       .query(query)
//       .then(res => {
//         resolve(true);
//       })
//       .catch(err => [console.error(err.stack)]);
//   });
// };

const postItem = (input) => {
  try {
    const query = {
    text: "INSERT INTO items (name, owner_id) VALUES($1, $2) RETURNING *",
    values: [input.name, input.owner_id]
  };
  const result = await pool.query(query);
  return result.rows[0];
  } catch (error) {
    console.log(error.detail);
  }
  
};

const listAllItems = async () => {
  try {
    const query = {
      text: "SELECT id, name FROM items"
    };
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.log(error.detail);
  }
};

const getItemDetails = async input => {
  try {
    const query = {
      text: "SELECT * FROM items WHERE id = $1",
      values: [input.id]
    };
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    console.log(error.detail);
  }
};

const listMyItems = async input => {
  try {
    const query = {
      text: "SELECT id, name FROM items WHERE borrower_id = $1",
      values: [input.id]
    };
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.log(error.detail);
  }
};

// // Has to be changed into the table items_borrowed
const borrowItem = async input => {
  try {
    const query = {
      text: "UPDATE items SET status = 'borrowed', borrower_id = $1 where id = $2",
      values: [input.borrower_id, input.id]
    };
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    console.log(error.detail);
  }
};

// // Has to be changed into the table items_borrowed

const returnItem = async input => {
  try {
    const query = {
      text: "UPDATE items SET status = 'available', borrower_id = null where id = $1",
      values: [input.borrower_id, input.id]
    };
  const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    console.log(error.detail);
  }
};

const main = async () => {
  //authenticaitons
  const user = [
    {
      name: "wil",
      password: "12345"
    },
    {
      name: "simon",
      password: "67890"
    }
  ];
  let res, me, another, mythings;

  res = await signup(user[0]);
  console.log("SIGN UP: ");
  console.log(res);
  console.log("");

  res = await signup(user[1]);
  console.log("SIGN UP: ");
  console.log(res);
  console.log("");

  console.log("BAD LOGIN: ");
  res = await login({
    name: "wil",
    password: "hahaha"
  });
  console.log(res);
  console.log("");

  console.log("GOOD LOGIN FOR User: " + user[0].name);
  me = await login(user[0]);
  console.log(me);
  console.log("");

  console.log("GOOD LOGIN FOR User: " + user[1].name);
  another = await login(user[1]);
  console.log(another);
  console.log("");

  //item ops
  const product = [
    {
      name: "road bike",
      owner_id: me.id
    },
    {
      name: "vacuum cleaner",
      owner_id: me.id
    },
    {
      name: "blue umbrella",
      owner_id: another.id
    }
  ];

  console.log("POST ITEM: ");
  res = await postItem(product[0]);
  console.log(res);
  console.log();

  console.log("POST ITEM: ");
  res = await postItem(product[1]);
  console.log(res);
  console.log();

  console.log("POST ITEM: ");
  res = await postItem(product[2]);
  console.log(res);
  console.log();

  console.log("LIST ALL ITEMS: ");
  res = await listAllItems();
  console.log(res);
  console.log();

  console.log("GET ITEM DETAILS: [ WHERE ITEM ID = " + res[0].id + "]");
  res = await getItemDetails({ id: res[0].id });
  console.log(res);
  console.log();

  // returnItem()
  console.log("LIST MY ITEMS: [ WHERE OWNER ID = " + me.id + "]");
  res = await listMyItems({ id: me.id });
  console.log(res);
  console.log();

  mythings = [];
  mythings[0] = res[0];
  mythings[1] = res[1];

  console.log("BORROW ITEM: [ WHERE ITEM ID = " + mythings[0].id + "]");
  res = await borrowItem({ id: mythings[0].id, borrower_id: another.id });
  console.log(res);
  console.log();

  console.log("BORROW ITEM: [ WHERE ITEM ID = " + mythings[1].id + "]");
  res = await borrowItem({ id: mythings[1].id, borrower_id: another.id });
  console.log(res);
  console.log();

  console.log("RETURN ITEM: [ WHERE ITEM ID = " + mythings[0].id + "]");
  res = await returnItem({ id: mythings[0].id });
  console.log(res);
  console.log();

  //user ops
  console.log("UPDATE USER PROFILE: [ WHERE USER ID = " + me.id + "]");
  res = await updateUserProfile({
    id: me.id,
    col: "location",
    val: "toronto"
  });
  console.log(res);
  console.log();

  console.log("GET USER PROFILE: [ WHERE USER ID = " + me.id + "]");
  res = await getUserProfile({ id: me.id });
  console.log(res);
  console.log();

  //done
  res = await logout(me);
  console.log("logout success");
  process.exit();
};

main();
