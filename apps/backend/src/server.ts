import express from "express";
import cors from "cors";
import { usersRouter } from "./routes/usersRoutes.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Backend API is running on http://localhost:${port}`);
});
