import sqlite3 from "sqlite3";

//verbose mode for debugging
sqlite3.verbose();

const db = new sqlite3.Database("game.db", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to SQLite database.");
  }
});

// Handle process exit to close the DB connection
process.on("exit", () => {
  db.close((err) => {
    if (err) console.error("Error closing database:", err.message);
    else console.log("Database connection closed.");
  });
});

export default db;
