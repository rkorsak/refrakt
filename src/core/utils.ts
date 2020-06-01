/**
 * Given a number and a min/max range, adjust the number
 * if necessary to fit within the range.
 */
export function clamp(min: number, max: number, val: number) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}
