const { HOST, USER, PASSWORD, DATABASE } = require("../constants/constants");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

connection.on("error", (err) => {
  console.error("Database error:", err);
});

const createBoards = async (req, res) => {
  try {
    const boards = {
      Title: req.body.Title,
      uuid: req.body.uuid,
    };

    const result = await connection
      .promise()
      .query("INSERT INTO boards SET ?", boards);
    res.json(result);
  } catch (error) {
    console.error("Error adding board:", error.stack);
    res.status(500).send("Error adding board");
  }
};

const addCards = async (req, res) => {
  try {
    const card = {
      Task: req.body.Task,
      board_id: req.body.board_id,
    };

    const result = await connection
      .promise()
      .query("INSERT INTO cards SET ?", card);
    res.json(result);
  } catch (error) {
    console.error("Error adding card:", error.stack);
    res.status(500).send("Error adding card");
  }
};

const getCards = async (req, res) => {
  try {
    const [rows] = await connection
      .promise()
      .query("SELECT * FROM cards ORDER BY position ASC");
    res.json({ results: rows });
  } catch (error) {
    console.error("Error getting cards:", error.stack);
    res.status(500).send("Error getting cards");
  }
};

const getBoards = async (req, res) => {
  try {
    const [rows] = await connection.promise().query("SELECT * FROM boards");
    res.json({ results: rows });
  } catch (error) {
    console.error("Error getting boards:", error.stack);
    res.status(500).send("Error getting boards");
  }
};

const updateCard = async (req, res) => {
  try {
    const { id, board_id, position } = req.body;
    if (board_id === undefined) {
      position.map((item, index) => {
        connection.query(
          `UPDATE cards SET position ='${index}' WHERE id=${item}`
        );
      });
      res.json({ message: "success" });
    } else {
      await connection
        .promise()
        .query(`UPDATE cards SET board_id ='${board_id}' WHERE id=${id}`);
      position.map((item, index) => {
        connection.query(
          `UPDATE cards SET position ='${index}' WHERE id=${item}`
        );
      });
      res.json({ message: "success" });
    }
  } catch (error) {
    console.error("Error updating card:", error.stack);
    res.status(500).send("Error updating card");
  }
};

const deleteCard = async (req, res) => {
  try {
    const [result] = await connection
      .promise()
      .query(`DELETE FROM cards WHERE id = ${req.params.id}`);
    res.json({ results: result });
  } catch (error) {
    console.error("Error deleting card:", error.stack);
    res.status(500).send("Error deleting card");
  }
};

const deleteBoard = (req, res) => {
  connection.query(
    `DELETE FROM boards WHERE uuid = "${req.params.id}"`,
    (error, results, fields) => {
      if (error) {
        console.error("Error deleting board: " + error.stack);
        res.status(500).send("Error deleting board");
        return;
      }
      res.json({
        results,
      });
    }
  );
};

const updateTitleBoard = (req, res) => {
  console.log(req.body);
  connection.query(
    `UPDATE boards SET Title = "${req.body.name}" WHERE uuid = "${req.body.id}"`,
    (error, results, fields) => {
      if (error) {
        console.error("Error updating board title: " + error.stack);
        res.status(500).send("Error updating board title");
        return;
      }
      res.json({
        results,
      });
    }
  );
};

module.exports = {
  createBoards,
  addCards,
  getCards,
  getBoards,
  updateCard,
  deleteCard,
  deleteBoard,
  updateTitleBoard,
};
