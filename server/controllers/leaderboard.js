import Leaderboard from "../models/leaderboard.js";

//Enter new entry into leaderboard database
export function createEntry(req, res) {
  const { name, gameMode, money, turnCount } = req.body;

  Leaderboard.create(name, gameMode, money, turnCount, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "Leaderboard entry created", entryId: result.id });
  });
}

//Get everyone in the leaderboard database
export function getAllEntries(req, res) {
  Leaderboard.findAll((err, entries) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(entries);
  });
}

//Find entry in leaderboard database
export function getEntryById(res, req) {
  const { id } = req.params;
  Leaderboard.findById(id, (err, entry) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!entry) return res.status(400).json({ message: "entry not found" });
    res.json(entry);
  });
}

//update entry in leaderboard database
export function updateEntry(res, req) {
  const { id } = req.params;
  const { name, gameMode, money, turnCount } = req.body;
  Leaderboard.update(id, name, gameMode, money, turnCount, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.changes === 0)
      return res.status(404).json({ message: "user not found" });
    res.json({ message: "entry was updated" });
  });
}

//delete entry in leaderboard database
export function deleteEntry(req, res) {
  const { id } = req.params;
  Leaderboard.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.changes === 0)
      return res.status(404).json({ message: "entry not found" });
    res.json({ message: "entry deleted" });
  });
}
