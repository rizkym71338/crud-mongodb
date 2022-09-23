const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { MongoClient } = require("mongodb");

const dev = process.env.NODE_ENV !== "production";
const hostname =
  process.env.NODE_ENV !== "production" ? "localhost" : process.env.HOSTNAME;
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, async (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
    onListening();
  });
});

function onListening() {
  const client = new MongoClient(process.env.DB_URL);
  const db = client.db("db_testing");
  setInterval(async () => {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const time = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
    const times = await db.collection("times").find().toArray();
    const filter = times.filter((e) => e.time == time);
    if (filter.length > 0) {
      await db
        .collection("times")
        .updateOne({ time }, { $set: { status: "1" } });
      console.log("RING ... IN " + time);
    }
    console.log(time);
  }, 1000);
}
