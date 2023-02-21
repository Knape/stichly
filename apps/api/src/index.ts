import * as express from "express";
import type { Application, Request, Response } from "express";
import * as cors from "cors";

import { api, generate } from "./routes";
import { yoga } from "./graphql/graphql";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("json spaces", 2);
app.use(cors({ origin: ["http://localhost:3001"] }));
app.use("/graphql", yoga);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/api", api);
app.use("/generate", generate);

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on: ${process.env.API_PORT}`);
});
