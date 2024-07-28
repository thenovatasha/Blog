import express from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static(path.join(process.cwd())));
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});
app.listen(port);

console.log("server started at http://localhost:" + port);
