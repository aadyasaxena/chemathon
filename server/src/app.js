import express from "express";
import connectDb from "../config/db.js";

import routerUser from "../routes/user.js";
import routerTeam from "../routes/team.js";
import router from "../routes/admin.js";
import accommodationRouter from "../routes/accommodation.js";

import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5501",
      "http://localhost:5500",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use("/user", routerUser);
app.use("/team", routerTeam);
app.use("/admin", router);
app.use("/accommodationRouter", accommodationRouter);

const port = process.env.PORT || 5500;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
  connectDb();
});
