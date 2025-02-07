import { useNPCContext } from "../../context/npcContext";
import { useGameContext } from "../../context/gameContext";
import { potWinnings } from "../../utility/calculationFunctionality";
import { useEffect, useMemo } from "react";

export default function Btn({ type }) {
  const { newRound, player, dealer, gameState, updateGameState, deck } =
    useGameContext();
  const { npcOne, npcTwo, npcThree, npcState, updateNpcState } =
    useNPCContext();
  const newDeck = deck;
  const battleContext = useNPCContext();
  const isBattle = useMemo(() => !!battleContext, [battleContext]);

  // Determine if the button should be disabled
  let disabled = false;
  if (type === "hit") {
    disabled = gameState.hitBtn;
  } else if (type === "stand") {
    disabled = gameState.standBtn;
  } else if (type === "bet") {
    disabled = gameState.betBtn;
  }

  // Update button states when betBtn.value changes
  useEffect(() => {
    if (gameState.betBtn) {
      updateGameState("standBtn", false);
      updateGameState("hitBtn", false);
    }
  }, [gameState.betBtn, gameState.standBtn, gameState.hitBtn]);

  // Logic for each button click
  const btnLookup = {
    // Show bet options
    bet: () => updateGameState("mainBtns", false),

    // Add card to player's hand
    hit: () => {
      const card = newDeck.shift();
      player?.drawCard(card);
      updateGameState("playerHand", [...player.hand]);
    },

    // Initiate dealer's turn and calculate pot winnings
    stand: () => {
      const npcs = npcOne
        ? [
            {
              npc: dealer,
              hand: gameState.dealerHand,
            },
            { npc: npcOne, hand: gameState.npcOneHand, name: "npcOneHand" },
            { npc: npcTwo, hand: gameState.npcTwoHand, name: "npcTwoHand" },
            {
              npc: npcThree,
              hand: gameState.npcThreeHand,
              name: "npcThreeHand",
            },
          ]
        : [
            {
              npc: dealer,
              hand: gameState.dealerHand,
            },
          ];
      npcs.forEach((npc) => {
        if (npc.npc.hand[1].faceDown) {
          npc.npc.hand[1].faceDown = false;
        }
        if (npcOne) {
          console.log(npcOne);
          updateNpcState(npc.name, npc.npc.hand);
        }
        npc.npc.makeDecision(newDeck.shift());
      });
      updateGameState("deck", newDeck);
      if (!isBattle) {
        updateNpcState("deck", newDeck);
      }
      const result = npcOne
        ? potWinnings(gameState.pot, updateGameState, [
            { person: player, money: "playerMoney", state: gameState },
            { person: npcOne, money: "npcOneMoney", state: npcState },
            { person: npcTwo, money: "npcTwoMoney", state: npcState },
            { person: npcThree, money: "npcThreeMoney", state: npcState },
            { person: dealer },
          ])
        : potWinnings(gameState.pot, updateGameState, [
            { person: player, money: "playerMoney", state: gameState },
            { person: dealer },
          ]);

      setTimeout(() => {
        newRound(player, dealer, npcState, npcOne, npcTwo, npcThree);
      }, 2500);
      updateGameState("hitBtn", false);
      updateGameState("standBtn", false);
      updateGameState("betBtn", true);
    },
  };

  // Handle button click
  function handleClick() {
    if (btnLookup[type]) {
      btnLookup[type]();
    }
  }

  return (
    <button
      disabled={!disabled} // Controls whether the button is clickable
      className={`btn py-2 px-4 rounded-lg font-semibold shadow-md transition-all duration-300
        ${
          disabled
            ? "bg-emeraldGreen text-richBlack hover:bg-gold hover:text-black"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }
      `}
      onClick={handleClick}
    >
      {type}
    </button>
  );
}
