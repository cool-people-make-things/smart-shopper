type LocalStorageKey = "cart" | "test";

/**
 * getLocalData - Retrieves data from localStorage by key
 * @param key - The key to retrieve
 * @returns Parsed data from localStorage or null if not found or parsing fails
 */
export function getLocalData(key: LocalStorageKey): CombinedCart | null {
  if (typeof window === "undefined") return null;

  try {
    const data = localStorage.getItem("smartShopper." + key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error((error as Error).message || "Error occurred: getLocalData.");
    return null;
  }
}

/**
 * setLocalData - Saves data to localStorage under a specified key
 * @param key - The key to save data under
 * @param data - The data to save
 */
export function setLocalData(key: LocalStorageKey, data: CombinedCart): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("smartShopper." + key, JSON.stringify(data));
  } catch (error) {
    console.error((error as Error).message || "Error occurred: setLocalData.");
    throw new Error("Error setting localStorage data.");
  }
}
