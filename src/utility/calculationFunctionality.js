export function potWinnings(pot, players, clientMoney) {
    const playerScores = [];
    players.map(player => {
        return playerScores.push(player.calculateHand());
    })
    const max = Math.max(...playerScores);
    const winners = players.filter(player => player.calculateHand() === max);
    console.log("max: ",max);
    console.log('winners: ', winners);
    const winnings = pot.value / winners.length;
    console.log("winnings: ", winnings);
    pot.set(0);
    console.log(winners)
    winners.map(winner => {
        const isDealer = winner.name.split(' ').includes('Dealer');
        if (!isDealer) {
            winner.money += winnings
            const winnerMoney = clientMoney.filter(client => client.name === winner.name);
            console.log("winnerMoney: ", winnerMoney);
            winnerMoney[0].set.set(winner.money)
        }
        return winners
    });
    return winners;
}
