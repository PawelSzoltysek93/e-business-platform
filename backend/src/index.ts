import express from "express";
/* import cors from 'cors'; */

const PORT = 3000;
const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
