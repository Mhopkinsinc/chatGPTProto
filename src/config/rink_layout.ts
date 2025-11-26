// src/config/rink_layout.ts
export const RINK_LAYOUT = {
  width: 384,
  height: 680,
  center: { x: 0, y: 0 }, // Center ice is now world origin!

  // World coordinate bounds (adjusted for offset)
  xMin: -192 + 4,   // -188
  xMax: 192 + 4,    // 196
  yMin: -340 - 22,  // -362
  yMax: 340 - 22,   // 318

  // Adjust other landmarks as needed
  bluelineTopY: -88 - 22,
  bluelineBottomY: 88 - 22,
  sideboardX: 136,
  goalTopY: -240 - 22,
  goalBottomY: 240 - 22
};