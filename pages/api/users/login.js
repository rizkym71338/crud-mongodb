import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export default async function Login(req, res) {
  const { username, password } = req.body;

  const client = await MongoClient.connect(process.env.DB_URL);
  const db = await client.db("db_testing");

  if (req.method == "POST") {
    try {
      const users = await db.collection("users").findOne({ username });
      const passwordCompare = await bcrypt.compare(password, users.password);
      passwordCompare && res.status(200).json({ msg: "users found", users });
    } catch (error) {
      res.status(500).json({ msg: "error" });
    }
  } else {
    res.status(400).json({ msg: "bad request" });
  }
}
