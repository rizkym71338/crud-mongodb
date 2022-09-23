import { MongoClient } from "mongodb";

export default async function Create(req, res) {
  const { time, status } = req.body;

  const client = await MongoClient.connect(process.env.DB_URL);
  const db = await client.db("db_testing");

  if (req.method == "POST") {
    try {
      const createTime = await db.collection("times").insertOne({
        time,
        status,
      });

      res.status(200).json({ msg: "time created", createTime });
    } catch (error) {
      res.status(500).json({ msg: "error" });
    }
  } else {
    res.status(400).json({ msg: "bad request" });
  }
}
