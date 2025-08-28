import { cleanInput } from "./cleanInput";

describe("Given a string input with restrictions on allowed characters and maximum length", () => {
  describe("When the string is passed to the sanitisation function", () => {
    it("Then it should allow letters", () => {
      expect(cleanInput("CocaCola")).toBe("CocaCola");
      expect(cleanInput("abcXYZ")).toBe("abcXYZ");
    });

    it("Then it should allow numbers", () => {
      expect(cleanInput("12345")).toBe("12345");
      expect(cleanInput("Coke123")).toBe("Coke123");
    });

    it("Then it should allow spaces and periods", () => {
      expect(cleanInput("Coca-Cola Soft Drink 2.25L")).toBe(
        "CocaCola Soft Drink 2.25L",
      );
    });

    it("Then it should remove invalid special characters", () => {
      expect(cleanInput("Coca-Cola@#!$")).toBe("CocaCola");
      expect(cleanInput("Milk/1L*")).toBe("Milk1L");
    });

    it("Then it should enforce the maximum length", () => {
      const longInput = "A".repeat(100);
      expect(cleanInput(longInput)).toHaveLength(50);
    });

    it("Then it should trim mixed valid characters to the maximum length", () => {
      const input = "Coca-Cola Soft Drink 2.25L".repeat(5);
      const result = cleanInput(input);
      expect(result.length).toBeLessThanOrEqual(50);
      expect(/[^a-zA-Z0-9 .]/.test(result)).toBe(false);
    });

    it("Then it should handle an empty string gracefully", () => {
      expect(cleanInput("")).toBe("");
    });
  });
});
