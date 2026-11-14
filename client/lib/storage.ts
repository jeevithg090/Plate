/** Returns window.localStorage when it is available and accessible. */
export function getBrowserStorage(): Storage | undefined {
  try {
    return typeof window !== "undefined" ? window.localStorage : undefined;
  } catch {
    return undefined;
  }
}
