export function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

export function calculateProgress(
  startTime: number,
  duration: number,
  currentTime: number
): number {
  const elapsed = currentTime - startTime;
  return Math.min(elapsed / duration, 1);
}
