import express, { Express } from "express";
import { router } from "./routes/router";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);
app.listen(port, () => {
  console.log("listening on port:\xa0", port);
});
