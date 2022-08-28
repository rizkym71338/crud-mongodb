import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

export default async function Create(req, res) {
  const { username, password } = req.body;

  const client = await MongoClient.connect(process.env.DB_URL);
  const db = await client.db("db_testing");

  if (req.method == "POST") {
    try {
      const createUser = await db.collection("users").insertOne({
        username,
        password: await bcrypt.hash(password, 10),
        role: "member",
      });

      const users = await db
        .collection("users")
        .findOne({ _id: createUser.insertedId });

      res.status(200).json({ msg: "user created", users });
    } catch (error) {
      res.status(500).json({ msg: "error" });
    }
  } else {
    res.status(400).json({ msg: "bad request" });
  }
}
