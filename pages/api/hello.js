// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://admin:rahasia123@cluster0.laechhg.mongodb.net/?retryWrites=true&w=majority";

export default async function handler(req, res) {
  const client = await MongoClient.connect(url);
  const db = client.db("db_testing");

  if (req.method == "GET") {
    const users = await db.collection("users").find().toArray();
    res.status(200).json({ msg: "OK", users });
  } else if (req.method == "PUT") {
    const users = await db.collection("users").updateOne(
      { name: "Rizky" },
      {
        $set: {
          name: "Rizky Maulana",
          email: "rizkym71338@gmail.com",
          role: "admin",
        },
      }
    );
    res.status(200).json({ msg: "users updated", users });
  } else {
    res.status(400).json({ msg: "bad request" });
  }

  client.close();
}
