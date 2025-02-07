import { Player } from "../models/Player";

export function potWinnings(potValue, updateState, players) {
  const playerScores = [];
  players.forEach((player) => {
    playerScores.push(player.person.calculateHand().value);
  });
  const max = Math.max(...playerScores);
  const winners = players.filter(
    (player) => player.person.calculateHand().value === max
  );
  switch (winners.length) {
    case 1:
      console.log(winners[0].person instanceof Player);
      winners[0].person.name !== "John"
        ? updateState("lossCount", 1)
        : updateState("winCount", 1);
      break;
    case "array":
      let playerWins = false;
      winners.forEach((winner) => {
        if (winner.person.name === "John") {
          console.log("Draw");
          playerWins = true;
        }
      });
      playerWins ? updateState("drawCount", 1) : updateState("lossCount", 1);
      break;
    default:
      break;
  }
  console.log("max: ", max);
  console.log("winners: ", winners);
  console.log("pot: ", potValue);
  const winnings = Math.floor(potValue / winners.length);
  console.log("winnings: ", winnings);
  updateState("pot", 0);
  console.log(winners);
  winners.map((winner) => {
    const isDealer = winner.person.name.split(" ").includes("Dealer");
    if (!isDealer) {
      winner.person.money += winnings;
      const winnerMoney = players.filter(
        (player) => player.person.name === winner.person.name
      );
      console.log("winnerMoney: ", winnerMoney);
      winners.forEach((winner) => {
        if (winner.money) {
          updateState(winner.money, winner.person?.money);
          winner.person.money += winner.state[winner.money];
        }
      });
    }
    return winners;
  });
  return winners;
}
