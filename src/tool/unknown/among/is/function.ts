export function isAmong(a: unknown, b: unknown[]): boolean {
  // The function exists for type safety
  return b.includes(a)
}
