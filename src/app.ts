import express from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import route from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "https://jamdani-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is up and running",
  });
});
app.use("/api", route);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
