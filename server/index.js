const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const {
  createBoards,
  addCards,
  getCards,
  getBoards,
  updateCard,
  deleteCard,
  deleteBoard,
  updateTitleBoard,
  updateTitleCard
} = require("./controller/Controller");

const { PORT, HOST } = require("./constants/constants");
const app = express();

app.use(bp.json());
app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(express.static("public"));

app.post("/api/createBoards", createBoards);

app.post("/api/addCards", addCards);

app.get("/api/getCards", getCards);

app.get("/api/getBoards", getBoards);

app.post("/api/updateCard", updateCard);

app.delete("/api/deleteCard/:id", deleteCard);

app.delete("/api/deleteBoard/:id", deleteBoard);

app.post("/api/updateTitleBoard", updateTitleBoard);

app.post("/api/updateTitleCard", updateTitleCard);

app.listen(PORT, () => {
  console.log(`Server is running: http:/${HOST}:${PORT}`);
});
