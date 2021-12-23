import express from "express";

const app = express();

app.listen(process.env.PORT, () => {
  console.log("Deliveryman is on air!");
});
