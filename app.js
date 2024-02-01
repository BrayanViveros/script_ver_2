import express from "express";
import cors from "cors";
import morgan from "morgan";
import miruta from "./routes/routes.User.js";
import taksRoutes from "./routes/tasks.routes.js";

import cookieParser from "cookie-parser";

const app = express();
// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/usuarios", miruta, taksRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

export default app;