import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import loginRoutes from "./route/auth.js";
import masterRoutes from "./route/masters.js";
import donorRoutes from "./route/donor.js";
import statsRoutes from "./route/stats.js";
import requestsRoutes from "./route/requests.js";





const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(compression());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


// app.use("/api/auth", loginRoutes);
// app.use("/api/masters", masterRoutes);
// app.use("/api/donors", donorRoutes);

app.use("/api/auth", loginRoutes);
app.use("/api/masters", masterRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/requests", requestsRoutes);


app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
    path: req.originalUrl,
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
    ...(NODE_ENV !== "production" && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${NODE_ENV})`);
});
