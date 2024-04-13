import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT;
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  withCredentials: true,
};

// RESEND_API=re_cCDPgf1C_BQN6XWZG1k92kjTSsbhSgNUT
// PORT=8000
// EMAIL=fazilathar856@gmail.com

import orderRoute from "../routes/order.route.js";

app
  .use(cors(corsOptions))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static("public"))
  .use("/images/:imagename", express.static("images"))
  .use("/biteapi/order", orderRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
