// deckUtils.test.js
describe("Deck manipulation functions in Jest", () => {
  it("clones the deck and pops a card without React setup", () => {
    const initialDeckArray = [
      { face: "h06", value: 6 },
      { face: "hQ", value: 10 },
      { face: "d09", value: 9 },
      { face: "c07", value: 7 },
      { face: "s02", value: 2 },
      { face: "hA", value: 11 },
    ];

    const newDeck = [...initialDeckArray];
    const poppedCard = newDeck.shift();

    // Assertions
    expect(poppedCard).toEqual({ face: "hA", value: 11 });
    expect(newDeck.length).toBe(initialDeckArray.length - 1);
    expect(newDeck).not.toContainEqual({ face: "hA", value: 11 });
  });
});
