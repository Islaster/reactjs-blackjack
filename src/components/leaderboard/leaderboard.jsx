export default function Leaderboard({ scores }) {
  /*create grid for leaderboard it should have name, highest bank, how many rounds it took to get that bank. Leaderboard should be sorted first by highest bank then by lowest round. Ex.
            ({name:jim,bank:5000, rounds:20},
            {name:tim,bank:5000, rounds:15});
            tim should be higher than jim*/
  return (
    <>
          <header className="sub">
              <div className="col">Name</div>
              <div className="col">Bank</div>
              <div className="col">Rounds</div>
          </header>
      {scores && scores.length > 0 ? (
        scores.map((score) => (
          <div className="row">
            {score.map((s) => (
              <>
                <div className="col">{s.name}</div>
                <div className="col">{s.bank}</div>
                <div className="col">{s.rounds}</div>
              </>
            ))}
          </div>
        ))
      ) : (
        <div>Be the first on the board</div>
      )}
    </>
  );
}
