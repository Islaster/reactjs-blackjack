import { render } from "@testing-library/react";
import Blackjack from "../modes/blackjack";

// Mock initial deck
const initialDeckArray = [
  { face: "h06", value: 6 },
  { face: "hQ", value: 10 },
  { face: "d09", value: 9 },
  { face: "c07", value: 7 },
  { face: "s02", value: 2 },
  { face: "hA", value: 11 },
];

describe("Blackjack Component - Deck Manipulation", () => {
  it("should clone the deck and pop cards in init", () => {
    const mockSetDeck = jest.fn();

    // Minimal render with only deck prop and basic config
    render(
      <Blackjack
        deck={{ value: initialDeckArray, set: mockSetDeck }}
        pot={{ value: 0, set: jest.fn() }}
        turnCount={{ value: 1, set: jest.fn() }}
        lose={{ value: false, set: jest.fn() }}
        win={{ value: false, set: jest.fn() }}
        draw={{ value: false, set: jest.fn() }}
        stand={{ value: false, set: jest.fn() }}
        bet={{ value: 0, set: jest.fn() }}
      />
    );

    // Assertions to check if `deck.set` was called to update the deck
    expect(mockSetDeck).toHaveBeenCalled();
    expect(mockSetDeck.mock.calls[0][0].length).toBeLessThan(initialDeckArray.length);
  });
});
