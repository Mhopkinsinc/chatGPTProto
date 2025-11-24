// src/config/rink_layout.ts
// Rink layout specification for camera, actors, collision, etc.

export const RINK_LAYOUT = {
  width: 384,           // Total width in pixels
  height: 680,          // Total height in pixels
  center: { x: 0, y: 0 }, // Center ice faceoff dot

  xMin: 0,           // Left edge
  xMax: 384,            // Right edge
  yMin: 0,           // Bottom edge
  yMax: 680,            // Top edge

  bluelineTopY: 88,     // Y position of top blueline
  bluelineBottomY: -88, // Y position of bottom blueline

  sideboardX: 136,      // X position of sideboards (left/right)
  goalTopY: 240,        // Y position of top goal
  goalBottomY: -240     // Y position of bottom goal
};
