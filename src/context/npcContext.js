import { createContext, useContext, useState, useRef } from "react";
import { NPC } from "../models/NPC";

const NPCContext = createContext({
  npcOne: undefined,
  npcTwo: undefined,
  npcThree: undefined,
  npcState: undefined,
  updateNpcState: { undefined },
});

export const NPCProvider = ({ deck, children }) => {
  const [npcState, setNpcState] = useState({
    npcOneHand: [],
    npcOneMoney: 0,
    npcTwoHand: [],
    npcTwoMoney: 0,
    npcThreeHand: [],
    npcThreeMoney: 0,
  });

  const npcNames = [
    "Aria",
    "Blaise",
    "Callum",
    "Daphne",
    "Ezekiel",
    "Freya",
    "Gideon",
    "Harlow",
    "Isla",
    "Jaxon",
    "Kael",
    "Lyric",
    "Mara",
    "Nolan",
    "Ophelia",
    "Phoenix",
    "Quinn",
    "Rhea",
    "Silas",
    "Thalia",
  ];
  const nameOne = npcNames[Math.floor(Math.random() * npcNames.length)];
  npcNames.splice(npcNames.indexOf(nameOne), 1);
  const nameTwo = npcNames[Math.floor(Math.random() * npcNames.length)];
  npcNames.splice(npcNames.indexOf(nameTwo), 1);
  const nameThree = npcNames[Math.floor(Math.random() * npcNames.length)];
  npcNames.splice(npcNames.indexOf(nameThree), 1);

  const updateNpcState = (key, value) => {
    setNpcState((prev) => ({ ...prev, [key]: value }));
  };

  const npcOne = useRef(
      new NPC(
        npcNames[Math.floor(Math.random() * npcNames.length)],
        "easy",
        1000,
        (hand) => updateNpcState("npcOneHand", hand),
        deck
      )
    ).current,
    npcTwo = useRef(
      new NPC(
        npcNames[Math.floor(Math.random() * npcNames.length)],
        "medium",
        1500,
        (hand) => updateNpcState("npcTwoHand", hand),
        deck
      )
    ).current,
    npcThree = useRef(
      new NPC(
        npcNames[Math.floor(Math.random() * npcNames.length)],
        "hard",
        2000,
        (hand) => updateNpcState("npcThreeHand", hand),
        deck
      )
    ).current;

  const value = {
    npcOne,
    npcTwo,
    npcThree,
    npcState,
    updateNpcState,
  };

  return <NPCContext.Provider value={value}>{children}</NPCContext.Provider>;
};

export const useNPCContext = () => useContext(NPCContext);
