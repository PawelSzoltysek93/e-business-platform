import "dotenv/config";
import { app } from "./app";
import { connectDB } from "./config/database";

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
