import { vi } from "vitest";

import { getLocalData, setLocalData } from "./localStorage";

describe("Given a user's data is accessed from localStorage", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe("When there is valid data in localStorage", () => {
    beforeAll(() => {
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: (key: string) => {
            if (key === "smartShopper.test") return '{"data":true}';
            if (key === "smartShopper.cart")
              return '{"nw":[],"pns":[],"wls":[]}';
            return null;
          },
        },
      });
    });

    it("Then the specified name is accessed", () => {
      const getSpy = vi.spyOn(window.localStorage, "getItem");

      getLocalData("test");
      expect(getSpy).toHaveBeenCalledWith("smartShopper.test");
    });

    it("Then the data is returned in the correct format", () => {
      const result = getLocalData("cart");
      expect(result).toEqual({ nw: [], pns: [], wls: [] });
    });
  });

  describe("When there is no saved data under the given name", () => {
    beforeAll(() => {
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: () => null, // Simulates no data for any key
        },
      });
    });

    it("Then a null value is returned", () => {
      const result = getLocalData("test");
      expect(result).toBeNull();
    });
  });

  describe("When localStorage has invalid data", () => {
    beforeAll(() => {
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: () => "invalid JSON",
        },
      });
    });

    it("Then a null value is returned", () => {
      const result = getLocalData("cart");
      expect(result).toBeNull();
    });

    it("Then the generated error is logged when the data is accessed", () => {
      getLocalData("test");

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Unexpected token 'i', \"invalid JSON\" is not valid JSON",
      );
    });
  });

  describe("When localStorage fails", () => {
    const failureMessage = "getItem error: Unable to retrieve test data";
    beforeAll(() => {
      vi.spyOn(window.localStorage, "getItem").mockImplementation(() => {
        throw new Error(failureMessage);
      });
    });

    it("Then the generated error is logged", () => {
      getLocalData("cart");
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(failureMessage);
    });

    it("Then a null value is returned", () => {
      const result = getLocalData("test");
      expect(result).toBeNull();
    });
  });
});

describe("Given a user's data is saved to localStorage", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: vi.fn(),
      },
    });
  });

  describe("When valid data is saved", () => {
    it("Then the data is saved under the specified name and in the correct format", () => {
      const setSpy = vi.spyOn(window.localStorage, "setItem");
      setLocalData("cart", { nw: [], pns: [], wls: [] });

      expect(setSpy).toHaveBeenCalledWith(
        "smartShopper.cart",
        '{"nw":[],"pns":[],"wls":[]}',
      );
    });
  });

  describe("When localStorage fails", () => {
    const failureMessage = "setItem error: Unable to save test data";
    beforeAll(() => {
      vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
        throw new Error(failureMessage);
      });
    });

    it("Then the generated error is logged", () => {
      try {
        setLocalData("test", { nw: [], pns: [], wls: [] });
      } catch {
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(failureMessage);
      }
    });

    it("Then the localStorage error is thrown", () => {
      expect(() => {
        setLocalData("test", { nw: [], pns: [], wls: [] });
      }).toThrow("Error setting localStorage data.");
    });
  });

  describe("When invalid data is saved", () => {
    it.todo("Then the data error is thrown");
  });
});
