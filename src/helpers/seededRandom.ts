/**
 *
 * @param seed Seed for the random generator
 * @param items Items to sort randomly
 * @param limit If you want fewer than the total list of items, specify a limit
 */
export function getSeededRandom<T>(seed: number, items: T[], limit = 0): T[] {
  // Internal limit is verified to be less than items.length
  const internalLimit = limit < items.length ? limit : 0;
  // Deterministic random generator; same input -> same output
  const buildRandom = (seed: number) => {
    let value = seed;
    return () => {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  };
  // Implements ☝️
  const getRandomIndex = buildRandom(seed);
  // List of indices, limits if set
  const itemIndices = items
    .filter((_, i) => internalLimit === 0 || i < internalLimit)
    .map((_, index) => index);
  // Now sorts deterministically
  const randomIndices = itemIndices.sort(() => getRandomIndex() - 0.5);
  return randomIndices.map((index) => items[index]);
}

/**
 * Function that returns a date object to today, but with no time component
 */
export function todayNoTime(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}
