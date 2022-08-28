import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const url =
  "mongodb+srv://admin:rahasia123@cluster0.laechhg.mongodb.net/?retryWrites=true&w=majority";

export default async function Login(req, res) {
  const { username, password } = req.body;

  const client = await MongoClient.connect(url);
  const db = client.db("db_testing");

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

  client.close();
}
