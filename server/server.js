const express = require("express");
const app = express();
const cors = require("cors");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let db = null;
const dbPath = path.join(__dirname, "recipeDatabase.db");

app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 3004;

const inintServer_and_db = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server running at ${PORT}`);
    });
    db = await open({ filename: dbPath, driver: sqlite3.Database });
  } catch (e) {
    console.log(`DB error ${e.message}`);
    process.exit(1);
  }
};
inintServer_and_db();

app.post("/validatePassword/", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  // Using parameterized query to prevent SQL injection

  const validate_qry = `SELECT * FROM UserCredentials WHERE username ='${username}';`;
  const user_details = await db.get(validate_qry);
  console.log(user_details);
  //   console.log(user_details);
  if (user_details) {
    // user found with username
    const is_pw_same = await bcrypt.compare(password, user_details.password);
    if (is_pw_same) {
      // pw matched
      const payload = { username: username };

      const jwt_token = await jwt.sign(payload, "random_text");
      res.send({ jwt_token });
    } else {
      // wrong password
      res.status(401);
      res.send("Invalid password");
    }
  } else {
    // user not found with username
    res.status(400);
    res.send("Invalid username");
  }
});

app.post("/registerUser/", async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;
  console.log(req.body);

  // Input validation
  if (!username || !email || !password || !phoneNumber) {
    res.status(400);
    res.send("All fields are required");
    return;
  }

  const validate_qry = `SELECT * FROM UserCredentials WHERE username ='${username}';`;
  const user_details = await db.get(validate_qry);
  console.log(user_details, "user_details");
  if (!user_details) {
    // user not registered with username,so register
    const hashedPassword = await bcrypt.hash(password, 15);
    const reg_qry = `INSERT INTO UserCredentials (username, email, password, phone_number) VALUES
     ('${username}', '${email}', '${hashedPassword}', ${phoneNumber});`;
    await db.run(reg_qry);

    res.send("registered successfully");
    return;
  } else {
    //  username found , username taken
    res.status(400);
    res.send("username taken");
    return;
  }
});
