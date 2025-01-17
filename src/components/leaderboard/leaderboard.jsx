export default function Leaderboard({ scores }) {
  // Sort scores: First by highest bank, then by lowest rounds
  const sortedScores = scores
    ? scores.sort((a, b) =>
        b.bank === a.bank ? a.rounds - b.rounds : b.bank - a.bank
      )
    : [];

  return (
    <div className="text-white">
      {/* Leaderboard Header */}
      <header className="text-center text-2xl font-bold bg-gold text-black p-4 rounded-t-lg shadow-leaderboard-glow">
        Leaderboard
      </header>
      {/* Table Header */}
      <div className="grid grid-cols-4 bg-deepBlue text-white text-lg font-semibold py-2 px-4 border-b border-gold">
        <div className="text-left">Rank</div>
        <div className="text-left">Name</div>
        <div className="text-center">Bank</div>
        <div className="text-right">Rounds</div>
      </div>
      {/* Table Rows */}
      {sortedScores && sortedScores.length > 0 ? (
        sortedScores.map((score, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 py-2 px-4 ${
              index % 2 === 0 ? "bg-greenFelt" : "bg-emeraldGreen"
            }`}
          >
            <div className="text-left">{index + 1}</div> {/* Rank */}
            <div className="text-left">{score.name}</div>
            <div className="text-center">{score.bank}</div>
            <div className="text-right">{score.rounds}</div>
          </div>
        ))
      ) : (
        <div className="py-4 px-4 text-center text-lg font-semibold bg-greenFelt">
          Be the first on the board!
        </div>
      )}
    </div>
  );
}
