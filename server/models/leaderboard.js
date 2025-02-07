import db from "../config/db.js";

const Leaderboard = {
  create: (name, gameMode, money, turnCount, callback) => {
    db.run(
      "INSERT INTO leaderboard (name, gameMode, money, turnCount) VALUES (?,?,?,?)",
      [name, gameMode, money, turnCount],
      function (err) {
        callback(err, { id: this.lastID });
      }
    );
  },
  findAll: (callback) => {
    db.all("SELECT * FROM leaderboard", [], (err, rows) => {
      callback(err, rows);
    });
  },
  findById: (id, callback) => {
    db.get("SELECT * FROM leaderboard WHERE id = ?", [id], function (err, row) {
      callback(err, row);
    });
  },
  update: (id, name, gameMode, money, turnCount, callback) => {
    db.run(
      "UPDATE leaderboard SET name = ?, email = ?, gameMode = ? money = ? turnCount = ? WHERE id = ?",
      [name, gameMode, money, turnCount],
      function (err) {
        callback(err, { changes: this.changes });
      }
    );
  },
  delete: (id, callback) => {
    db.run("DELETE FROM leaderboard WHERE = ?", [id], function (err) {
      callback(err, { changes: this.changes });
    });
  },
};

export default Leaderboard;
